# Deep Bio Data — Sitio web

Sitio trilingüe (en/es/pt) de Deep Bio Data: IA biomédica (análisis de sesgo, inferencia causal, IA explicable). **Astro 5** con salida estática + endpoint de contacto Node (`@astrojs/node` standalone), listo para cualquier servidor Linux con nginx.

## Arranque rápido

```bash
npm install
npm run dev          # desarrollo en http://localhost:4321
npm run build        # build de producción en ./dist (client + server)
npm run preview      # sirve el build (las 404 por idioma hay que abrirlas por URL directa)
npm run screenshots  # QA visual: capturas + informe de overflow (necesita preview activo)
```

Requisitos: Node 20+ (probado con Node 26). Playwright usa el canal `chrome` (Chrome/Edge instalado).

## Estructura

```
src/
  styles/global.css      ← Tokens del design system + componentes
  layouts/BaseLayout.astro
  components/            ← Header, Footer, CtaBand, ServiceCards
  data/home.json         ← Contenido de la home y servicios (bloques en/es/pt)
  pages/
    en/ es/ pt/          ← Los tres idiomas viven bajo prefijo propio (33 páginas)
    api/contact.ts       ← Endpoint del formulario (Node + nodemailer)
  assets/
deploy/
  nginx.conf             ← Redirects, 404 por idioma, cabeceras y cache
  deepbiodata.service    ← Unidad systemd
  .env.example           ← Plantilla de variables (SMTP, puerto, etc.)
netlify.toml             ← Solo si se desplegara en Netlify (en servidor Linux se ignora)
```

## Formulario de contacto

Sin dependencias externas (ni Netlify Forms ni servicios de terceros):

- Los tres formularios (en/es/pt) envían por AJAX un JSON a **`/api/contact`**.
- El servidor **revalida todo** (espejo de la validación cliente), comprueba el honeypot (`bot-field`), el origen (`Origin`), el tamaño del payload y aplica un **límite de 5 envíos/hora por IP** (429).
- El email se envía por **SMTP con nodemailer** usando las variables `SMTP_*`; el buzón destino es `CONTACT_TO`.
- Si SMTP no está configurado o falla, el endpoint responde 503/502 y la página muestra un mensaje elegante remitiendo a info@deepbiodata.com — nunca se abre una aplicación de correo.
- Para probar el circuito sin SMTP real: `SMTP_DRY_RUN=json` deja el email en el log del servidor.
- Accesibilidad: `aria-invalid` + `aria-describedby` + `role="alert"`, foco al primer error.

## Despliegue en servidor Linux

El `npm run build` genera `dist/client` (estáticos) y `dist/server/entry.mjs` (Node standalone que sirve los estáticos y el endpoint `/api/contact`).

1. Servidor: `git clone`, `npm ci`, `npm run build`.
2. Configuración: `cp deploy/.env.example deploy/.env` y rellenar SMTP y puerto (`chmod 600 deploy/.env`).
3. Servicio: `sudo cp deploy/deepbiodata.service /etc/systemd/system/ && sudo systemctl enable --now deepbiodata` (escucha en `127.0.0.1:4321`).
4. Nginx: `sudo cp deploy/nginx.conf /etc/nginx/sites-available/deepbiodata.conf` y `sudo cp deploy/headers-security.conf /etc/nginx/snippets/`; enlazar en `sites-enabled`, `nginx -t` y reload. TLS con `sudo certbot --nginx`.
5. La raíz `/` redirige a `/en/`; las URLs antiguas sin prefijo (`/contact`, `/team`…) hacen 301 a su equivalente `/en/`; cada URL inexistente bajo `/en/`, `/es/` o `/pt/` sirve la 404 localizada de ese idioma.
6. Cabeceras de seguridad (CSP estricta, HSTS, X-Frame-Options…) van en `deploy/headers-security.conf`: cualquier script nuevo debe ser inline propio o bundle local; nada de CDNs externos.

## Convenciones del sitio

- Tres idiomas **siempre**: toda página nueva existe en `src/pages/en/`, `src/pages/es/` y `src/pages/pt/`; el contenido de la home/servicios vive en `src/data/home.json`.
- Conmutador de idioma con `hreflang`, scroll y foco preservados; `hreflang` + canonical + OG + JSON-LD (Organization con dirección de Lisboa) + sitemap por idioma.
- Fuentes autoalojadas (Fraunces + Inter vía @fontsource) e imágenes WebP: sin peticiones externas.

## Datos pendientes de completar por el cliente (marcados con [corchetes])

- `[COMPANY LEGAL NAME]`, `[CIF/NIF]`, `[REGISTERED ADDRESS]`, `[CITY]` en `legal-notice` y `privacy-policy` (en y es).
- `[HOSTING PROVIDER / EU REGION]` en la política de privacidad: rellenarlo con el proveedor del servidor Linux.
- Validar los textos legales con un asesor jurídico antes de publicar.
