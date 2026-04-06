import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sun from "../../public/images/desktop/icon-sun.svg";
import moon from "../../public/images/desktop/icon-moon.svg";
import searchIcon from "../../public/images/desktop/icon-search.svg";
import map from "../../public/images/desktop/icon-location.svg";
import data from "../data.json";
import "./jobs.css";

export default function Jobs() {
  const [isDark, setIsDark] = useState(false);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [isFullTime, setIsFullTime] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDark);
  }, [isDark]);

  let filteredJobs = data.filter((job) => {
    const matchesSearch =
      job.position.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = job.location.toLowerCase().includes(location.toLowerCase());
    const matchesType = isFullTime ? job.contract === "Full Time" : true;

    return matchesSearch && matchesLocation && matchesType;
  });

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

        <div className="filters-bar">
          <div className="filter-section search-input">
            <img src={searchIcon} alt="" />
            <input
              type="text"
              placeholder="Filter by title, companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-line"></div>
          <div className="filter-section location-input">
            <img src={map} alt="" />
            <input
              type="text"
              placeholder="Filter by location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="filter-line"></div>
          <div className="filter-section check-section">
            <div className="custom-check">
              <input
                type="checkbox"
                id="fulltime"
                checked={isFullTime}
                onChange={(e) => setIsFullTime(e.target.checked)}
              />
              <label htmlFor="fulltime">Full Time Only</label>
            </div>
            <button className="btn-search">Search</button>
          </div>
        </div>
      </header>

      <main className="content-area">
        <div className="jobs-grid">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Link to={`/jobs/${job.id}`} className="job-card-link" key={job.id}>
                <div className="job-card">
                  <div className="logo-container" style={{ backgroundColor: job.logoBackground }}>
                    <img src={job.logo} alt={job.company} />
                  </div>
                  <div className="card-body">
                    <p className="job-meta">
                      {job.postedAt} • {job.contract}
                    </p>
                    <h2 className="job-title">{job.position}</h2>
                    <p className="job-company">{job.company}</p>
                    <h3 className="job-location">{job.location}</h3>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="no-results">No jobs found matching your criteria.</p>
          )}
        </div>
      </main>
    </div>
  );
}
