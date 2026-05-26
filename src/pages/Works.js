// src/pages/Works.js
import React from 'react';
import '../pages/Home.css'; // Use the same CSS as Home.js

function Works() {
  return (
    <div className="home-page">
      <img src="/Logo.jpeg" alt="DeepBiodata Logo" className="logo" />
      <div className="content">
        <h1>Our Works</h1>
        <p>
          AI for Clinical Research, Public Health, and Explainable Biomedical Intelligence
        </p>

        <section className="section">
          <h2>Introduction</h2>
          <p>
            At Deep Bio Data, we develop advanced analytical and AI-driven solutions aimed at improving clinical research reliability, predictive healthcare systems, and public-health decision making. Our work combines causal inference, Machine Learning, Deep Learning, and explainable AI to address real-world biomedical and healthcare challenges.
          </p>
        </section>

        <section className="section">
          <h2>COVID-19 Pandemic Modeling & Predictive Intelligence</h2>
          <img src="/covid_1.png" alt="Covid Research" className="homePict" />
          <p>
            One of our major analytical initiatives focused on the modeling and prediction of COVID-19 diffusion dynamics during the pandemic period.
          </p>
          <ul>
            <li>Modeling virus diffusion patterns across regions and populations</li>
            <li>Estimating transmission dynamics under changing mobility and restriction scenarios</li>
            <li>Predicting healthcare-system stress and hospitalization trends</li>
            <li>Supporting early-risk assessment and outbreak forecasting</li>
            <li>Quantifying the impact of intervention and mitigation strategies</li>
          </ul>
          <p>
            The analytical framework integrated:
          </p>
          <ul>
            <li>Temporal epidemiological data</li>
            <li>Population mobility information</li>
            <li>Demographic and geographic variables</li>
            <li>Clinical and hospitalization indicators</li>
            <li>Multi-source public-health datasets</li>
          </ul>
        </section>

        <section className="section">
          <h2>Supporting Public-Health Decision Making</h2>
            <img src="/covid_2.png" alt="Covid Research" className="homePict" />          <p>
            Our predictive systems contributed to analytical and operational support activities aligned with European public-health objectives during the pandemic response period.
          </p>
          <ul>
            <li>Early detection of high-risk diffusion zones</li>
            <li>Resource prioritization and planning</li>
            <li>Evaluation of intervention effectiveness</li>
            <li>Mitigation-strategy optimization</li>
            <li>Reduction of healthcare-system overload risk</li>
          </ul>
          <p>
            The ultimate objective was to help reduce both:
          </p>
          <ul>
            <li>Human impact, including severe illness and mortality</li>
            <li>Economic and societal disruption associated with uncontrolled diffusion</li>
          </ul>
        </section>

        <section className="section">
          <h2>Advanced AI & Predictive Modeling</h2>
          <img src="/covid_3.png" alt="Covid Research" className="homePict" />
          <h3>Clinical Predictive Systems</h3>
          <ul>
            <li>Disease-risk prediction</li>
            <li>Outcome forecasting</li>
            <li>Personalized risk stratification</li>
            <li>Multimodal clinical modeling</li>
          </ul>

          <h3>Medical Imaging AI</h3>
          <ul>
            <li>CNN and Transformer-based imaging analysis</li>
            <li>Radiomics and multimodal fusion</li>
            <li>Explainable imaging intelligence</li>
            <li>White-box reconstruction of deep models</li>
          </ul>

          <h3>Bias-Control & Causal AI</h3>
          <ul>
            <li>Statistical bias identification</li>
            <li>Propensity-score methodologies</li>
            <li>Causal inference pipelines</li>
            <li>Fairness and robustness validation</li>
          </ul>
        </section>

        <section className="section">
          <h2>Explainable & Trustworthy AI</h2>
          <img src="/covid_4.png" alt="Covid Research" className="homePict" />
          <p>
            A major focus of our work is ensuring that advanced AI systems remain transparent, auditable, and clinically meaningful.
          </p>
          <ul>
            <li>Explaining model decisions</li>
            <li>Identifying clinically relevant predictive mechanisms</li>
            <li>Detecting hidden biases and shortcut learning</li>
            <li>Reconstructing black-box models into white-box systems</li>
          </ul>
        </section>

        <section className="section">
          <h2>Research & Collaboration</h2>
          <img src="/covid_5.png" alt="Covid Research" className="homePict" />
          <p>
            Deep Bio Data actively collaborates with:
          </p>
          <ul>
            <li>Clinical research groups</li>
            <li>Hospitals and healthcare institutions</li>
            <li>Biomedical innovation programs</li>
            <li>Academic and public-health partners</li>
          </ul>
        </section>

        <p className="footer-text">Deep Bio Data - Building Transparent AI for Clinical Research and Public Health</p>
      </div>
    </div>
  );
}

export default Works;
