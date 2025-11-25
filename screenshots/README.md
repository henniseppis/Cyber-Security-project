# Screenshots Folder

This folder should contain screenshots demonstrating each security flaw before and after applying fixes.

## Required Screenshots

Store screenshots using the naming convention: `flaw-X-before-Y.png` and `flaw-X-after-Y.png`

### FLAW 1: SQL Injection (A03:2021)
- `flaw-1-before-1.png` - Normal search result
- `flaw-1-before-2.png` - SQL injection attack showing all users (query: `' OR '1'='1`)
- `flaw-1-after-1.png` - Same injection attempt blocked after fix

### FLAW 2: Cryptographic Failures - Plaintext Passwords (A02:2021)
- `flaw-2-before-1.png` - Database view showing plaintext passwords in users table
- `flaw-2-after-1.png` - Database view showing hashed passwords after fix

### FLAW 3: Broken Access Control (A01:2021)
- `flaw-3-before-1.png` - Successful unauthenticated search via curl (no session)
- `flaw-3-after-1.png` - 401 Unauthorized response after fix

### FLAW 4: Security Misconfiguration (A05:2021)
- `flaw-4-before-1.png` - curl response showing `Access-Control-Allow-Origin: *`
- `flaw-4-before-2.png` - Verbose error message exposing SQL details
- `flaw-4-after-1.png` - curl response showing `Access-Control-Allow-Origin: http://localhost:3000`

### FLAW 5: No Rate Limiting (A07:2021)
- `flaw-5-before-1.png` - Terminal showing 20+ failed login attempts all processed
- `flaw-5-after-1.png` - Rate limit error message after 5 attempts

## Screenshot Guidelines

- Use clear, readable screenshots
- Ensure no sensitive personal information is visible
- Show browser window or terminal as appropriate
- Include timestamps if relevant
- Use descriptive filenames
- PNG format preferred

## Tools for Screenshots

- **Windows:** Snipping Tool, Win+Shift+S
- **macOS:** Cmd+Shift+4
- **Linux:** gnome-screenshot, scrot, or built-in tools
- **Browser DevTools:** Built-in screenshot tools

## Database Screenshots

To view the SQLite database for FLAW 2 screenshots:
1. Install [DB Browser for SQLite](https://sqlitebrowser.org/)
2. Open `backend/users.db`
3. Browse the `users` table
4. Take screenshots of the password column
