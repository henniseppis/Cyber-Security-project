## Project Description

Cybersecurity course project that implements a web application with 5 intentional security flaws from the OWASP Top 10 2021 list.

## Security Flaws Used

This application contains the following vulnerabilities:

1. **A03:2021 - Injection (SQL Injection)** - User search endpoint vulnerable to SQL injection
2. **A02:2021 - Cryptographic Failures** - Passwords stored in plaintext
3. **A01:2021 - Broken Access Control** - No authentication required for search endpoint
4. **A05:2021 - Security Misconfiguration** - CORS wildcard and verbose error messages
5. **A07:2021 - Identification and Authentication Failures** - No rate limiting on login

## Prerequisites

### Installation

#### Clone the application to your computer

```bash
git clone https://github.com/henniseppis/Cyber-Security-project.git

```

#### Enter the project folder

```bash
cd Cyber-Security-project
```

#### Install Backend Dependencies

```bash
# Navigate to backend directory, remember to be inside the project root directory at this point
cd backend

# Install dependencies
npm install

```

#### Install Frontend Dependencies

```bash
# Navigate to frontend directory, remember to be inside the project root directory at this point
cd frontend

# Install dependencies
npm install
```

## Running the Application

You need to run both the backend and frontend servers. So open **two separate terminal windows**.

### Terminal 1: Start the Backend Server

```bash
# Navigate to backend directory, remember to be inside the project root directory at this point
cd backend

# Start the server
npm start
```
### Terminal 2: Start the Frontend Server

```bash
# Navigate to frontend directory, remember to be inside the project root directory at this point
cd frontend

# Start the React development server
npm start
```

#### Most important code in this project

You can find the backend code and the flaws inside backend/server.js

## Essay

See the returned essay for detailed instructions (returned to the course page so only visible to the students/teachers in the course).
