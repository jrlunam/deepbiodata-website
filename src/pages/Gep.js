// src/pages/Home.js
import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      <img src="/Logo.jpeg" alt="DeepBiodata Logo" className="logo" />
      <div className="content">
        <h1>Gender Equality Plan</h1>
        <img src="/GEP.png" alt="Clinic Research" className="homePict" />

        <section className="section">
          <h2>Our commitment to equality, inclusion, and responsible innovation</h2>
          <p>
            At Deep BioData, we are committed to promoting equal opportunities, respect, and inclusion across our organisation and research activities.
          </p>
          <p>
            We believe that a fair and inclusive working environment supports scientific excellence, responsible innovation, and the development of technologies that respond to real-world needs.
          </p>
          <p>
            Our <strong>Gender Equality Plan (GEP)</strong> establishes a framework for promoting equal opportunities, supporting fair recruitment and career development, encouraging balanced representation in leadership, and preventing discrimination and harassment.
          </p>
        </section>

        <section className="section">
          <h2>Our priorities</h2>
          <p>Our Gender Equality Plan focuses on five key areas.</p>
          <h3>1. Equal opportunities and career development</h3>
          <p>
            We promote fair and transparent recruitment, professional development, remuneration, and career progression based on relevant qualifications, skills, responsibilities, and performance.
          </p>
          <p>
            We aim to ensure that everyone has equal opportunities to contribute, develop professionally, and fulfil their potential.
          </p>

          <h3>2. Gender balance in leadership</h3>
          <p>
            We encourage equal opportunities to participate in management, project leadership, and organisational decision-making.
          </p>
          <p>
            We recognise the value of diverse perspectives in strengthening collaboration, improving decision-making, and supporting innovation.
          </p>

          <h3>3. Work-life balance and an inclusive culture</h3>
          <p>
            We seek to foster a respectful working environment that supports work-life balance, recognises individual circumstances, and promotes equal participation.
          </p>
          <p>
            We are committed to creating a culture in which people are treated with dignity and respect and can balance professional responsibilities with personal and family commitments.
          </p>

          <h3>4. Prevention of discrimination and harassment</h3>
          <p>
            We are committed to maintaining a workplace free from discrimination, bullying, sexual harassment, and other forms of inappropriate conduct.
          </p>
          <p>
            We aim to ensure that concerns can be raised through appropriate channels and handled fairly, sensitively, and confidentially, in accordance with applicable legal requirements.
          </p>

          <h3>5. Gender equality in research and innovation</h3>
          <p>
            As a company involved in data-driven research and innovation, Deep BioData recognises the importance of considering sex- and gender-related factors where scientifically relevant.
          </p>
          <p>
            In research concerning women's health and pregnancy, this includes attention to relevant biological and clinical characteristics, data representativeness, potential bias in artificial intelligence (AI) systems, and the responsible interpretation of research findings.
          </p>
          <p>
            We aim to promote scientifically rigorous and responsible research that considers the needs of relevant populations and the limitations of the data and methods used.
          </p>

        </section>

        <section className="section">
          <h2>Implementation and accountability</h2>
          <p>
            Our Gender Equality Plan establishes responsibilities, implementation measures, monitoring indicators, and periodic management reviews.
          </p>
          <p>
            Through appropriate training, regular assessment, and continuous improvement, we aim to strengthen equality and inclusion across our organisation and research activities.
          </p>
          <p>
            We will review our practices as the company grows, adapting our actions to our organisational needs and the requirements applicable to our activities.
          </p>
        </section>

        <section className="section">
          <h2>Our Gender Equality Plan 2026–2029</h2>
          <p>
            We believe that gender equality requires clear commitments, practical action, and ongoing evaluation.
          </p>
          <p>
            Our full Gender Equality Plan describes our objectives, responsibilities, implementation measures, monitoring indicators, and review arrangements in greater detail.
          </p><p>
            <a
              href="/Deep_BioData_Gender_Equality_Plan_2026-2029.pdf"
              download
              style={{ color: '#004BFF', textDecoration: 'none' }}
            >
              <strong>Download the Gender Equality Plan 2026–2029 (PDF)</strong>
            </a>
          </p>
        </section>

        <p className="footer-text">Deep Bio Data - Causal Intelligence for Clinical Research</p>
      </div>
    </div>
  );
}

export default Home;
