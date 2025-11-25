import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Search from './Search';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [sessionId, setSessionId] = useState(localStorage.getItem('sessionId') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  const handleLogin = (session, user) => {
    setSessionId(session);
    setUsername(user);
    localStorage.setItem('sessionId', session);
    localStorage.setItem('username', user);
    setCurrentPage('search');
  };

  const handleLogout = () => {
    setSessionId('');
    setUsername('');
    localStorage.removeItem('sessionId');
    localStorage.removeItem('username');
    setCurrentPage('login');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weak User Management System</h1>
        {username && (
          <div className="user-info">
            <span>Logged in as: {username}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
        {!username && (
          <div className="user-info">
            <span>Not logged in!</span>
          </div>
        )}
      </header>

      <div className="content">
        {currentPage === 'login' && (
          <>
            <Login onLogin={handleLogin} />
            <p>
              Don't have an account?{' '}
              <button onClick={() => setCurrentPage('register')}>Register</button>
            </p>
          </>
        )}

        {currentPage === 'register' && (
          <>
            <Register onRegister={() => setCurrentPage('login')} />
            <p>
              Already have an account?{' '}
              <button onClick={() => setCurrentPage('login')}>Login</button>
            </p>
          </>
        )}

        {currentPage === 'search' && <Search sessionId={sessionId} />}
      </div>
    </div>
  );
}

export default App;
