import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import data from "../data.json";
import "./JobDetail.css";

const sun = "/images/desktop/icon-sun.svg";
const moon = "/images/desktop/icon-moon.svg";

export default function JobDetail() {
  const { id } = useParams();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDark);
  }, [isDark]);

  const job = data.find((item) => item.id.toString() === id);

  if (!job) {
    return <div>Job not found!</div>;
  }

  return (
    <div className="container">
      <header className="main-header">
        <div className="header-top">
          <h1 className="logo-text">devjobs</h1>
          <div className="theme-switcher">
            <img src={sun} alt="" className="theme-icon" />
            <button className="toggle-track" onClick={() => setIsDark(!isDark)}>
              <div className={`toggle-knob ${isDark ? "is-dark" : ""}`} />
            </button>
            <img src={moon} alt="" className="theme-icon" />
          </div>
        </div>
      </header>

      <main className="detail-container">
        <div className="company-header-card">
          <div className="logo-square" style={{ backgroundColor: job.logoBackground }}>
            <img src={job.logo} alt={job.company} />
          </div>
          <div className="header-text">
            <h2>{job.company}</h2>
            <p>{job.company.toLowerCase()}.com</p>
          </div>
          <button className="company-site-btn">Company Site</button>
        </div>

        <div className="job-content-card">
          <div className="content-top">
            <div className="title-group">
              <p className="meta">
                {job.postedAt} • {job.contract}
              </p>
              <h1 className="detail-title">{job.position}</h1>
              <p className="location">{job.location}</p>
            </div>
            <button className="apply-now-btn">Apply Now</button>
          </div>

          <div className="description">
            <p>{job.description}</p>
          </div>

          <div className="section">
            <h3>Requirements</h3>
            <p>{job.requirements.content}</p>
            <ul className="requirements-list">
              {job.requirements.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="section">
            <h3>What You Will Do</h3>
            <p>{job.role.content}</p>
            <ol className="role-list">
              {job.role.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </div>
        </div>
      </main>

      <footer className="detail-footer">
        <div className="footer-content">
          <div className="footer-text">
            <h3>{job.position}</h3>
            <p>{job.company}</p>
          </div>
          <button className="apply-now-btn">Apply Now</button>
        </div>
      </footer>
    </div>
  );
}
