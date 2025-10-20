import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects from our backend
    const fetchProjects = async () => {
      try {
        // We can use /api/projects because of the proxy in vite.config.js
        const { data } = await axios.get('/api/projects');
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center' }}>My <span className="gradient-text">Projects</span></h2>
      <div className="card-grid">
        {projects.length === 0 ? (
          <p>Loading projects...</p>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a 
                href={project.repo_link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn" 
                style={{ marginTop: '1rem' }}
              >
                View on GitHub
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Projects;