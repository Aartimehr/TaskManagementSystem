import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Master Your Day with TaskFlow</h1>
        <p>The simplest way to manage your personal and professional productivity.</p>
        <Link to="/register" className="btn-primary">Get Started for Free</Link>
      </section>

      {/* What is a Task Management System? */}
      <section className="info-section">
        <h2>What does a Task Management System do?</h2>
        <p>
          A task management system is more than a to-do list. It is a digital workspace 
          that helps you track tasks from beginning to end, set priorities, and 
          organize your life so nothing falls through the cracks.
        </p>
      </section>

      {/* What We Offer */}
      <section className="offers">
        <h2>What We Offer</h2>
        <div className="grid">
          <div className="card">
            <h3>Cloud Sync</h3>
            <p>Access your tasks from anywhere, anytime on any device.</p>
          </div>
          <div className="card">
            <h3>Secure Auth</h3>
            <p>Your data is protected with industry-standard JWT encryption.</p>
          </div>
          <div className="card">
            <h3>Clean Interface</h3>
            <p>A minimalist design that helps you focus on doing, not planning.</p>
          </div>
        </div>
      </section>

      {/* Why Use This? */}
      <section className="why-use">
        <h2>Why use TaskFlow?</h2>
        <ul>
          <li><strong>Reduce Stress:</strong> Get your tasks out of your head and onto the screen.</li>
          <li><strong>Increase Focus:</strong> Prioritize what matters most today.</li>
          <li><strong>Track Progress:</strong> Visualize your wins as you complete tasks.</li>
        </ul>
      </section>
    </div>
  );
};

export default Home;