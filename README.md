## Project Description

Cybersecurity course project that implements a web application with 5 intentional security flaws from the OWASP Top 10 (2021) list. The application provides basic user management functionality including registration, login and user search.

## Security Flaws Used

This application contains the following vulnerabilities:

1. **A03:2021 - Injection (SQL Injection)** - User search endpoint vulnerable to SQL injection
2. **A02:2021 - Cryptographic Failures** - Passwords stored in plaintext
3. **A01:2021 - Broken Access Control** - No authentication required for search endpoint
4. **A05:2021 - Security Misconfiguration** - CORS wildcard and verbose error messages
5. **A07:2021 - Identification and Authentication Failures** - No rate limiting on login

## Prerequisites

### All Platforms
- **Node.js** (version 14.x or higher)

### Installation

#### Install Backend Dependencies

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Return to project root
cd ..
```

#### Install Frontend Dependencies

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Return to project root
cd ..
```

## Running the Application

You need to run both the backend and frontend servers. So open **two separate terminal windows**.

### Terminal 1: Start the Backend Server

```bash
# Navigate to backend directory
cd backend

# Start the server
npm start
```
### Terminal 2: Start the Frontend Server

```bash
# Navigate to frontend directory
cd frontend

# Start the React development server
npm start
```

## Essay

See the returned essay for detailed instructions (returned to the course page so only visible to the students/teachers in the course).
