# 📝 Markdown Notes Application (Full Stack)

A full-stack Markdown Notes App built using **React, Node.js, Express, and SQLite**.  
This project allows users to create, edit, delete, and search notes with real-time Markdown preview and authentication.

---

# 🚀 Live Demo
> Add your deployed link here later

---

# 📌 Features

## 🔐 Authentication
- User login system
- Secure login validation
- Default credentials provided (admin / 1234)

## 📝 Notes Management
- Create notes
- Edit notes
- Delete notes
- View all notes

## 🔎 Search Functionality
- Search notes by title
- Search notes by content

## 📄 Markdown Support
- Live Markdown preview
- Supports:
  - Headings
  - Bold / Italic text
  - Lists
  - Links
  - Code blocks

## ⚡ UI/UX Features
- Clean and simple interface
- Split-screen editor
- Responsive layout

---

# 🛠 Tech Stack

## Frontend
- React.js
- Axios
- React Markdown
- HTML, CSS, JavaScript

## Backend
- Node.js
- Express.js
- SQLite3
- CORS

---

# 📁 Project Structure


markdown-notes-app/
│
├── backend/
│ ├── server.js
│ ├── notes.db
│
├── frontend/
│ ├── src/
│ │ ├── App.js
│ │ ├── App.css
│ │ ├── index.js
│
└── README.md


---

# ⚙️ Installation Guide

## 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/markdown-notes-app.git
cd markdown-notes-app
2️⃣ Backend Setup
cd backend
npm install
node server.js

Backend runs on:

http://localhost:5000
3️⃣ Frontend Setup
cd frontend
npm install
npm start

Frontend runs on:

http://localhost:3000
🔐 Login Credentials
Username: admin
Password: 1234
📡 API Endpoints
Authentication
POST /login → user login
Notes
GET /notes → fetch all notes
POST /notes → create note
PUT /notes/:id → update note
DELETE /notes/:id → delete note
🚀 Future Improvements
JWT authentication
Password encryption (bcrypt)
User registration system
Dark mode UI
Deployment (Vercel + Render)
👨‍💻 Author

Built as a full-stack assignment proj
