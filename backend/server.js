const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const app = express();
const PORT = 3001;

const db = new Database('users.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT
  )
`);

// Test users
const insertUser = db.prepare('INSERT OR IGNORE INTO users (username, password, email) VALUES (?, ?, ?)');
insertUser.run('alice', 'password123', 'alice@example.com');
insertUser.run('bob', 'qwerty', 'bob@example.com');
insertUser.run('charlie', 'admin', 'charlie@example.com');

// FLAW 4: A05:2021 Security Misconfiguration
// Wildcard CORS origin allows any website to make requests to API
app.use(cors({
  origin: '*',  // Here wildcard
  credentials: true
}));

// FIX for FLAW 4: Use specific allowed origins
// app.use(cors({
//   origin: 'http://localhost:3000',  // Only reqs from frontend
//   credentials: true
// }));

app.use(express.json());
const sessions = new Map();

// FLAW 5: A07:2021 Identification and Authentication Failures
// No rate limiting on login endpoint allows brute force attacks
//

// FIX for FLAW 5: Simple rate limiting
// const loginAttempts = new Map();
// const MAX_ATTEMPTS = 5;
// const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes
//
// function checkRateLimit(username) {
//   const now = Date.now();
//   const attempts = loginAttempts.get(username) || { count: 0, firstAttempt: now };
//
//   if (now - attempts.firstAttempt > LOCKOUT_TIME) {
//     loginAttempts.delete(username);
//     return true;
//   }
//
//   if (attempts.count >= MAX_ATTEMPTS) {
//     return false;
//   }
//
//   return true;
// }
//
// function recordLoginAttempt(username) {
//   const now = Date.now();
//   const attempts = loginAttempts.get(username) || { count: 0, firstAttempt: now };
//   attempts.count++;
//   loginAttempts.set(username, attempts);
// }

// FLAW 2: A02:2021 Cryptographic Failures
// Passwords are stored in plaintext and compared directly
app.post('/api/register', (req, res) => {
  const { username, password, email } = req.body;

  try {
    // VULNERABLE: Storing password in plaintext
    const insert = db.prepare('INSERT INTO users (username, password, email) VALUES (?, ?, ?)');
    insert.run(username, password, email);

    // FIX for FLAW 2: Hash password before storing
    // const crypto = require('crypto');
    // const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    // const insert = db.prepare('INSERT INTO users (username, password, email) VALUES (?, ?, ?)');
    // insert.run(username, hashedPassword, email);

    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    // FLAW 4 (continued): Error messages expose database structure
    res.status(400).json({ success: false, error: error.message });

    // FIX for FLAW 4: Generic error messages without giving too much info to user
    // res.status(400).json({ success: false, error: 'Registration failed' });
  }
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // FIX for FLAW 5: Check rate limit before processing login
  // if (!checkRateLimit(username)) {
  //   return res.status(429).json({
  //     success: false,
  //     error: 'Too many login attempts. Please try again later.'
  //   });
  // }

  try {
    // FLAW 2 continued: Plaintext password comparison
    const user = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?').get(username, password);

    // FIX for FLAW 2: Hash input password and compare
    // const crypto = require('crypto');
    // const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    // const user = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?').get(username, hashedPassword);

    if (user) {
      const sessionId = Math.random().toString(36).substring(7);
      sessions.set(sessionId, { username: user.username, userId: user.id });

      res.json({
        success: true,
        sessionId,
        username: user.username
      });
    } else {
      // FIX for FLAW 5: Record failed attempt
      // recordLoginAttempt(username);

      res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
  } catch (error) {
    // FLAW 4 (continued): Verbose error messages
    res.status(500).json({ success: false, error: error.message });

    // FIX for FLAW 4: Generic error messages without giving too much info to user
    // res.status(500).json({ success: false, error: 'Login failed' });
  }
});

// FLAW 3: A01:2021 - Broken Access Control
// No authentication check on the search endpoint
// Any user can search without being logged in

// FLAW 1: A03:2021 - Injection
// User input is directly concatenated into SQL query

// VULNERABLE CODE FLAW 3 BELOW
app.get('/api/search', (req, res) => {
  const { query } = req.query;

  // FIX for FLAW 3: Validate session before allowing search
  // const sessionId = req.headers['authorization'];
  // if (!sessionId || !sessions.has(sessionId)) {
  //   return res.status(401).json({ success: false, error: 'Unauthorized' });
  // }

  try {
    // VULNERABLE CODE FLAW1: SQL Injection
    const sql = `SELECT id, username, email FROM users WHERE username LIKE '%${query}%'`;
    const users = db.prepare(sql).all();

    // FIX for FLAW 1: Use parameterized queries
    // const users = db.prepare('SELECT id, username, email FROM users WHERE username LIKE ?').all(`%${query}%`);

    res.json({ success: true, users });
  } catch (error) {
    // FLAW 4 (continued): Verbose error messages reveal SQL structure
    res.status(500).json({ success: false, error: error.message, query });

    // FIX for FLAW 4: Generic error message
    // res.status(500).json({ success: false, error: 'Search failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
