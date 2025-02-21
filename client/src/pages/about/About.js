import React from "react";
import "./About.css";
import NavBar from '../../components/nav-bar/NavBar';

const About = () => {
  return (
    <main>
      <NavBar />
      <div className="about-container">
        <section className="about-header">
          <h1>About Us</h1>
          <p>
            Welcome to our website! We are committed to providing the best service to our society.
          </p>
        </section>

        <section className="about-details">
          <h2>Our Mission</h2>
          <p>
            The National Service Scheme (NSS) is a Government of India program that aims to develop the character and personality of student youth through community service.
          </p>
        </section>

        <section className="about-features">
          <h2>Key Features</h2>
          <ul>
            <li>Develop social and civic responsibility.</li>
            <li>Understand the community.</li>
            <li>Identify community needs.</li>
            <li>Practice national integration.</li>
            <li>Develop leadership qualities.</li>
          </ul>
        </section>

        <section className="about-contact">
          <h2>Contact Us</h2>
          <p>If you have any questions, feel free to reach out to us!</p>
          <button>Contact Support</button>
        </section>
      </div>
    </main>
  );
};

export default About;
