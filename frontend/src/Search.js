import React, { useState } from 'react';

function Search({ sessionId }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setResults([]);

    try {
      const response = await fetch(`http://localhost:3001/api/search?query=${encodeURIComponent(query)}`, {
        headers: {
          'Authorization': sessionId,
        },
      });

      const data = await response.json();

      if (data.success) {
        setResults(data.users);
      } else {
        setError(data.error || 'Search failed');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    }
  };

  return (
    <div className="search-container">
      <h2>Search Users</h2>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label>Search by username:</label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter username"
          />
        </div>
        <button type="submit">Search</button>
      </form>

      {error && <div className="error">{error}</div>}

      {results.length > 0 && (
        <div className="results">
          <h3>Results ({results.length}):</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {results.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Search;
