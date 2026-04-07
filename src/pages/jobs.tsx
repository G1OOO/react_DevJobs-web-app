import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import data from "../data.json";
import "./jobs.css";

const sun = "/images/desktop/icon-sun.svg";
const moon = "/images/desktop/icon-moon.svg";
const searchIcon = "/images/desktop/icon-search.svg";
const map = "/images/desktop/icon-location.svg";

export default function Jobs() {
  const [isDark, setIsDark] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [isFullTimeInput, setIsFullTimeInput] = useState(false);

  const [activeSearch, setActiveSearch] = useState("");
  const [activeLocation, setActiveLocation] = useState("");
  const [activeFullTime, setActiveFullTime] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDark);
  }, [isDark]);

  const handleSearch = () => {
    setActiveSearch(searchInput);
    setActiveLocation(locationInput);
    setActiveFullTime(isFullTimeInput);
  };

  const filteredJobs = data.filter((job) => {
    const matchesSearch =
      job.position.toLowerCase().includes(activeSearch.toLowerCase()) ||
      job.company.toLowerCase().includes(activeSearch.toLowerCase());
    const matchesLocation = job.location.toLowerCase().includes(activeLocation.toLowerCase());
    const matchesType = activeFullTime ? job.contract === "Full Time" : true;

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
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div className="filter-line"></div>
          <div className="filter-section location-input">
            <img src={map} alt="" />
            <input
              type="text"
              placeholder="Filter by location..."
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
            />
          </div>
          <div className="filter-line"></div>
          <div className="filter-section check-section">
            <div className="custom-check">
              <input
                type="checkbox"
                id="fulltime"
                checked={isFullTimeInput}
                onChange={(e) => setIsFullTimeInput(e.target.checked)}
              />
              <label htmlFor="fulltime">Full Time Only</label>
            </div>
            <button className="btn-search" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </header>

      <main className="content-area">
        <div className="jobs-grid">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Link to={`/jobs/${job.id}`} className="job-card-link" key={job.id}>
                <div className="job-card">
                  <div
                    className="logo-container"
                    style={{ backgroundColor: job.logoBackground }}
                  >
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
        <button className="btn-load">Load More</button>
      </main>
    </div>
  );
}