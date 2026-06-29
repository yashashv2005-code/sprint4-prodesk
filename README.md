# AI Cover Letter Generator SaaS (React + Node.js + Gemini)

A full-stack SaaS app that generates ATS-friendly cover letters using the **Google Gemini API**.

## Features

- Modern responsive UI (glassmorphism, gradient, rounded cards, animations)
- Cover letter generation form (candidate name, job role, company, skills, experience, education)
- Loading spinner + disabled button while generating
- Generated cover letter card with:
  - Copy to clipboard
  - Download as PDF
  - Word count + character counter
  - Toast notifications
  - Reset form
  - Dark mode toggle
- Backend API:
  - `POST /generate`
  - Gemini prompt engineering (ATS-friendly, max 350 words)
- Bonus:
  - Resume upload (PDF) using `pdf-parse`
  - Extracted resume text appended to Gemini prompt for personalization

## Tech Stack

### Frontend
- React (Vite)
- Axios
- CSS

### Backend
- Node.js + Express
- cors, dotenv

### AI
- Google Gemini API

## Project Structure

```
cover-letter-generator/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Form.jsx
│   │   │   ├── CoverLetter.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── ResumeUpload.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
└── backend/
    ├── routes/
    │   └── generate.js
    ├── controllers/
    │   └── generateController.js
    ├── server.js
    ├── .env.example
    ├── package.json
    └── .gitignore
```

## Setup

### 1) Backend

```bash
cd backend
npm install
```

Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

Set `GEMINI_API_KEY`.

Run:

```bash
npm start
```

Backend runs on `http://localhost:4000` by default.

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` by default.

## API Request

`POST /generate`

Body:

```json
{
  "name": "...",
  "role": "...",
  "company": "...",
  "skills": "...",
  "experience": "...",
  "education": "...",
  "resumeText": "... (optional)"
}
```

## Notes

- The Gemini API key is only used on the server (never exposed in the frontend).
- If you don’t use the bonus resume upload, `resumeText` can be omitted.

