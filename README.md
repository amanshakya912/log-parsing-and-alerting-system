# Log Analyzer & Web URL Scanner

## Overview
This project consists of two main tools:
1. **Log Analyzer**: Parses and analyzes log files for suspicious patterns, such as failed logins, unauthorized access attempts, SQL injections, and other security threats.
2. **Web URL Scanner**: Scans web pages for security vulnerabilities, including missing HTTP security headers, outdated server software, and insecure form actions.

The project is built using **Node.js** for the backend and **React** for the frontend. The backend is hosted at https://log-parsing-and-alerting-system-production.up.railway.app using railway, while the frontend is accessible at https://system-monitor-and-web-scanner-emve.vercel.app/ using vercel.

---

## Features
### Log Analyzer
- Uploads and scans UTF-8 encoded log files (`.txt`, `.log`, etc.).
- Detects security-related patterns using keyword matching and regex.
- Provides a detailed report on detected threats.

### Web URL Scanner
- Checks for missing HTTP security headers.
- Identifies outdated server software versions.
- Detects insecure forms that use `GET` methods or lack an action attribute.
- Crawls and scans internal links for additional security issues.

---

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- **Node.js**
- **npm** or **yarn**

### Backend Setup
```sh
# Clone the repository
git clone https://github.com/amanshakya912/log-parsing-and-alerting-system
cd log-parsing-and-alerting-system

# Install dependencies
npm install

# Start the server
npm start
```
The backend runs locally at `http://localhost:3000`.

### Frontend Setup
view at https://github.com/amanshakya912/system-monitor-and-web-scanner

## Main Functions
### Log Analyzer
The main log analyzer function is located at systemMonitor.js

### Web URL Scanner
The main web url scanner function is located at webScanner.js

## Usage
### Log Analyzer
1. Upload a `.txt` or `.log` file (UTF-8 encoded).
2. Click **Analyze** to scan for security threats.
3. View the results in real-time.

### Web URL Scanner
1. Enter a full URL (e.g., `https://example.com`).
2. Click **Scan URL** to analyze the page for vulnerabilities.
3. View security warnings.

---

## Assumptions & Limitations
### Log Analyzer
- Only supports **UTF-8 encoded** files (`.txt`, `.log`, etc.).
- Does **not** detect non-text-based security threats.

### Web URL Scanner
- Requires a **fully qualified URL** (must include `http://` or `https://`).
- Only scans the **provided domain and its internal links** (no external crawling).
- Limited support for dynamically loaded content (e.g., JavaScript-rendered pages).
- Does not perform active penetration testing—only passive checks.

---

## API Endpoints
### Backend Routes
| Method | Endpoint       | Description |
|--------|---------------|-------------|
| `POST` | `/analyze`    | Uploads and analyzes log files |
| `POST` | `/scan`       | Scans a given URL for security vulnerabilities |

---

## Contact
For any questions or support, contact **amanshakya9912@gmail.com**.

