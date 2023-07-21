// src/App.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file for App

const GITHUB_API_URL = 'https://api.github.com/repos/octocat/Hello-World/issues';

interface Issue {
  id: number;
  url: string;
  title: string;
}

const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    async function fetchIssues() {
      try {
        const response = await axios.get<Issue[]>(GITHUB_API_URL, {
          params: {
            page,
            per_page: 10,
          },
        });
        setIssues(response.data);
      } catch (error) {
        console.error('Error fetching GitHub issues:', error);
      }
    }
    fetchIssues();
  }, [page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="app">
      <div className="issue-card-list">
        {issues.map((issue) => (
          <div key={issue.id} className="issue-card">
            <a href={issue.url} target="_blank" rel="noopener noreferrer">
              <div className="issue-title">{issue.title}</div>
            </a>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 1}>
          Prev
        </button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default App;
