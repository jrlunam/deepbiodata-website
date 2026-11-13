import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false;

/**
 * Endpoint del formulario de contacto (los tres idiomas envían aquí).
 *
 * Sin dependencia de Netlify: validación en servidor (espejo del cliente),
 * honeypot, límite de frecuencia por IP y envío por SMTP (nodemailer).
 *
 * Variables de entorno (ver deploy/.env.example):
 *   SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, SMTP_FROM,
 *   CONTACT_TO (opcional, por defecto info@deepbiodata.com)
 *   SMTP_DRY_RUN=json  → no envía; deja el email en el log (pruebas).
 */

const MAX_MESSAGE = 2000;
const MAX_FIELD = 254;
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

const RE_NAME = /^[A-Za-zÀ-ÖØ-öø-ÿ' .-]{2,80}$/;
const RE_ORG = /^[^<>{};`$\\]{1,120}$/;
const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RE_PHONE = /^\+?[\d\s().-]{9,20}$/;
const RE_CTRL = /[\u0000-\u001F\u007F]/;
const RE_LOCALE = /^(en|es|pt)$/;

type Payload = {
  lang?: unknown;
  name?: unknown;
  organisation?: unknown;
  email?: unknown;
  phone?: unknown;
  type?: unknown;
  message?: unknown;
  consent?: unknown;
  botfield?: unknown;
};

const str = (v: unknown): string => (typeof v === 'string' ? v.trim() : '');

const rateBuckets = new Map<string, number[]>();
let lastSweep = Date.now();

const sweepBuckets = (now: number) => {
  if (now - lastSweep < WINDOW_MS) return;
  lastSweep = now;
  for (const [ip, hits] of rateBuckets) {
    const alive = hits.filter((t) => now - t < WINDOW_MS);
    if (alive.length === 0) rateBuckets.delete(ip);
    else rateBuckets.set(ip, alive);
  }
};

const clientIp = (request: Request): string => {
  const fwd = request.headers.get('x-forwarded-for');
  return (fwd ? fwd.split(',')[0] : request.headers.get('x-real-ip') ?? '') || 'unknown';
};

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });

const smtpConfigured = () =>
  process.env.SMTP_DRY_RUN === 'json' ||
  (Boolean(process.env.SMTP_HOST) && Boolean(process.env.SMTP_USER) && Boolean(process.env.SMTP_PASS));

const sendEmail = async (p: {
  lang: string;
  name: string;
  organisation: string;
  email: string;
  phone: string;
  type: string;
  message: string;
  ip: string;
}) => {
  const to = process.env.CONTACT_TO || 'info@deepbiodata.com';
  const from = process.env.SMTP_FROM || process.env.SMTP_USER || 'contact@deepbiodata.com';
  const subject = `[web:${p.lang}] ${p.type} — ${p.name}`;
  const text = [
    `Idioma: ${p.lang}`,
    `Nombre: ${p.name}`,
    `Organización: ${p.organisation || '—'}`,
    `Email: ${p.email}`,
    `Teléfono: ${p.phone || '—'}`,
    `Tipo de colaboración: ${p.type}`,
    '',
    'Mensaje:',
    p.message,
    '',
    `— Enviado desde deepbiodata.com · IP: ${p.ip}`,
  ].join('\n');

  if (process.env.SMTP_DRY_RUN === 'json') {
    console.log(JSON.stringify({ dryRun: true, to, from, subject, text }));
    return;
  }

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true' || Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
  });

  await transport.sendMail({ from, to, replyTo: p.email, subject, text });
};

export const POST: APIRoute = async ({ request }) => {
  // Solo mismo origen (el formulario nunca se envía desde otro sitio).
  const origin = request.headers.get('origin');
  if (origin) {
    try {
      if (new URL(origin).host !== request.headers.get('host')) {
        return json(403, { ok: false, code: 'forbidden' });
      }
    } catch {
      return json(403, { ok: false, code: 'forbidden' });
    }
  }

  const ip = clientIp(request);
  const now = Date.now();
  sweepBuckets(now);
  const hits = (rateBuckets.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) {
    return json(429, { ok: false, code: 'rate_limited' });
  }

  let ctype = request.headers.get('content-type') ?? '';
  if (!ctype.includes('application/json')) {
    return json(415, { ok: false, code: 'unsupported_media_type' });
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return json(400, { ok: false, code: 'bad_request' });
  }
  if (raw.length > 20_000) {
    return json(413, { ok: false, code: 'payload_too_large' });
  }

  let body: Payload;
  try {
    body = JSON.parse(raw) as Payload;
  } catch {
    return json(400, { ok: false, code: 'bad_json' });
  }

  // Honeypot: los bots que rellenan el campo oculto reciben éxito simulado
  // (no se envía nada y no se consume el límite de frecuencia).
  if (str(body.botfield) !== '') {
    return json(200, { ok: true });
  }

  const lang = str(body.lang);
  const name = str(body.name);
  const organisation = str(body.organisation);
  const email = str(body.email);
  const phone = str(body.phone);
  const type = str(body.type);
  const message = str(body.message).replace(/\r\n/g, '\n');

  const errors: Record<string, string> = {};
  if (!RE_LOCALE.test(lang)) errors.lang = 'invalid';
  if (!RE_NAME.test(name) || RE_CTRL.test(name)) errors.name = 'invalid';
  if (organisation !== '' && (!RE_ORG.test(organisation) || RE_CTRL.test(organisation))) errors.organisation = 'invalid';
  if (!RE_EMAIL.test(email) || RE_CTRL.test(email)) errors.email = 'invalid';
  if (phone !== '') {
    const digits = phone.replace(/\D/g, '');
    if (!RE_PHONE.test(phone) || digits.length < 9 || digits.length > 15 || RE_CTRL.test(phone)) {
      errors.phone = 'invalid';
    }
  }
  if (!/^(hospital|institute|university|programme|other)$/.test(type)) errors.type = 'invalid';
  const plainMessage = message.replace(/[\t\n\r]/g, ' ');
  if (message.length < 20 || message.length > MAX_MESSAGE || RE_CTRL.test(plainMessage)) errors.message = 'invalid';
  if (body.consent !== true) errors.consent = 'required';
  if (Object.keys(errors).length > 0) {
    return json(400, { ok: false, code: 'validation_failed', errors });
  }

  if (!smtpConfigured()) {
    console.error('[contact] SMTP sin configurar: no se puede enviar el email. Revisa SMTP_* en el entorno.');
    return json(503, { ok: false, code: 'smtp_not_configured' });
  }

  hits.push(now);
  rateBuckets.set(ip, hits);

  try {
    await sendEmail({ lang, name, organisation, email, phone, type, message, ip });
  } catch (err) {
    console.error('[contact] fallo SMTP:', err instanceof Error ? err.message : err);
    return json(502, { ok: false, code: 'smtp_error' });
  }

  return json(200, { ok: true });
};
