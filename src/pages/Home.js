// src/pages/Home.js
import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      <img src="/Logo.jpeg" alt="DeepBiodata Logo" className="logo" />
      <div className="content">
        <h1>Deep Bio Data</h1>
        <p>
          Advancing Clinical Research Through Causal AI, Bias Control, and Explainable Intelligence
        </p>

        <section className="section">
          <h2>Our Mission</h2>
          <p>
            Deep Bio Data is a research-driven technology initiative focused on improving the reliability, transparency, and predictive power of modern clinical data analysis. We collaborate with hospitals, clinical research groups, and biomedical institutions to address one of the major challenges in contemporary healthcare analytics: ensuring that advanced Artificial Intelligence systems are not only accurate, but also scientifically trustworthy, interpretable, and clinically meaningful.
          </p>
        </section>

        <section className="section">
          <h2>What We Do</h2>
          <h3>Bias Analysis & Causal Inference</h3>
          <ul>
            <li>Detect, quantify, and mitigate statistical and demographic bias in biomedical datasets</li>
            <li>Improve fairness and generalizability</li>
            <li>Strengthen the scientific validity of clinical studies</li>
          </ul>

          <h3>AI & Predictive Modeling</h3>
          <ul>
            <li>Classical statistical models</li>
            <li>Random Forest and Gradient Boosting</li>
            <li>Deep Neural Networks</li>
            <li>Imaging AI with CNNs and Transformers</li>
          </ul>

          <h3>Explainable & White-Box AI</h3>
          <ul>
            <li>Understand which variables drive predictions</li>
            <li>Visualize relevant imaging regions</li>
            <li>Detect shortcut learning and hidden biases</li>
          </ul>
        </section>

        <section className="section">
          <h2>Our Vision</h2>
          <p>
            We envision a new generation of biomedical AI where:
          </p>
          <ul>
            <li>Prediction is combined with causal understanding</li>
            <li>Performance is combined with transparency</li>
            <li>Automation is combined with scientific accountability</li>
          </ul>
        </section>

        <section className="section">
          <h2>Collaboration</h2>
          <p>
            We actively seek collaboration with:
          </p>
          <ul>
            <li>Hospitals and clinical research units</li>
            <li>Biomedical research institutes</li>
            <li>Universities and academic laboratories</li>
            <li>Public and private healthcare innovation programs</li>
          </ul>
        </section>

        <p className="footer-text">Deep Bio Data - Causal Intelligence for Clinical Research</p>
      </div>
    </div>
  );
}

export default Home;
