// src/pages/Team.js
import React from 'react';
import '../pages/Home.css'; // Use the same CSS as Home.js

function Team() {
  return (
    <div className="home-page">
      <img src="/Logo.jpeg" alt="DeepBiodata Logo" className="logo" />
      <div className="content">
        <h1>Our Team</h1>
        <p>
          Deep Bio Data brings together expertise in data science, clinical analytics, Machine Learning, causal inference, and explainable AI to support the next generation of trustworthy biomedical intelligence systems.
        </p>

        <section className="section">
          <h2>Stella Luna</h2>
          <img src="/public/estela.jpeg" alt="Stella Luna" className="portrait" />
          <h3>Chief Executive Officer (CEO)</h3>
          <p>
            Stella Luna is a senior specialist with more than 20 years of experience in data analytics, Machine Learning, and the leadership of advanced data-driven projects. She holds degrees in Mathematics and Physics from the Autonomous University of Madrid (UAM), combining strong theoretical foundations with extensive practical experience in applied scientific analytics and AI methodologies.
          </p>
          <p>
            Throughout her career, she has led and participated in multidisciplinary projects focused on:
          </p>
          <ul>
            <li>Data Science and predictive analytics</li>
            <li>Machine Learning systems</li>
            <li>Biomedical and scientific data analysis</li>
            <li>Advanced statistical modeling</li>
            <li>AI-driven research initiatives</li>
          </ul>
          <p>
            Stella Luna is also a regular speaker and contributor in media and scientific communication initiatives related to Data Science, Artificial Intelligence, and Machine Learning.
          </p>
          <p className="footer-text">
            <strong>Professional Profile</strong><br />
            LinkedIn: <a href="https://linkedin.com/in/stella-luna" target="_blank" rel="noopener noreferrer">Stella Luna de María</a><br />
            Media & Scientific Communication:<br />
            YouTube Channel: <a href="https://youtube.com/pentaquark" target="_blank" rel="noopener noreferrer">Pentaquark</a>
          </p>
        </section>

        <section className="section">
          <h2>Jose Ramon Luna</h2>
          <img src="/public/ramon.jpeg" alt="Ramon Luna" className="portrait" />
          <h3>Chief Data Officer (CDO)</h3>
          <p>
            Jose Ramon Luna is a specialist with more than 20 years of experience in Data Analytics, Machine Learning, and Artificial Intelligence across multiple sectors, with a particular focus on healthcare and biomedical applications. He holds degrees in Physics and Mathematics from the Autonomous University of Madrid (UAM), and a Master’s Degree in Risk Management from the MEFF Institute.
          </p>
          <p>
            His work focuses on the integration of:
          </p>
          <ul>
            <li>Causal inference methodologies</li>
            <li>Statistical bias detection and mitigation</li>
            <li>Predictive Machine Learning systems</li>
            <li>Deep Learning and multimodal AI</li>
            <li>Explainable and white-box AI frameworks</li>
            <li>Clinical predictive modeling and biomedical analytics</li>
          </ul>
          <p>
            His research and technical interests include:
          </p>
          <ul>
            <li>Propensity-score methodologies</li>
            <li>Causal Machine Learning</li>
            <li>Mechanistic interpretability</li>
            <li>Clinical predictive systems</li>
            <li>Imaging AI and multimodal architectures</li>
            <li>Robustness and fairness validation</li>
          </ul>
          <p>
            At Deep Bio Data, he leads the technical strategy behind the development of clinically interpretable and scientifically reliable AI systems for biomedical research and healthcare innovation.
          </p>
          <p className="footer-text">
            <strong>Media & Public Communication</strong><br />
            On February 24, 2026, he participated in an interview on Intereconomía TV discussing the challenges and implications of bias, AI, and predictive systems in healthcare and data science.<br />
            <a href="https://youtu.be/QWBmTnoMXL4" target="_blank" rel="noopener noreferrer">Interview Video</a>
          </p>
        </section>

        <section className="section">
          <h2>Our Vision</h2>
          <p>
            We believe that the future of clinical AI requires a balance between:
          </p>
          <ul>
            <li>Scientific rigor</li>
            <li>Predictive performance</li>
            <li>Transparency</li>
            <li>Interpretability</li>
            <li>Clinical trust</li>
          </ul>
          <p>
            Our mission is to help build AI systems that clinicians, researchers, and healthcare institutions can understand, validate, and safely integrate into real-world biomedical environments.
          </p>
        </section>

        <p className="footer-text">Deep Bio Data - Building Transparent AI for Clinical Research and Public Health</p>
      </div>
    </div>
  );
}

export default Team;
