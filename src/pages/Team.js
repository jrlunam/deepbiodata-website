// src/pages/Team.js
import React from 'react';
import '../pages/Home.css';

function Team() {
  return (
    <div className="background-page">
      <h1>Our Team</h1>
      <div className="team-members">
        <div className="member">John Doe - CEO</div>
        <div className="member">Jane Smith - CTO</div>
        <div className="member">Mike Johnson - Designer</div>
      </div>
    </div>
  );
}

export default Team;
