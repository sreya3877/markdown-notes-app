import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");

  // LOGIN
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // PASSWORD TOGGLE
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (loggedIn) fetchNotes();
  }, [loggedIn]);

  const fetchNotes = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/notes`)
    setNotes(res.data);
  };

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Username and password required");
      return;
    }

    const res = await axios.post("http://localhost:5000/login", {
      username,
      password,
    });

    if (res.data.success) {
      setLoggedIn(true);
      alert("Login successful");
    } else {
      alert("Invalid credentials (use admin / 1234)");
    }
  };

  const logout = () => {
    setLoggedIn(false);
    setUsername("");
    setPassword("");
    setTitle("");
    setContent("");
  };

  const saveNote = async () => {
    if (!title || !content) {
      alert("Title and content required");
      return;
    }

    if (selectedId) {
      await axios.put(`http://localhost:5000/notes/${selectedId}`, {
        title,
        content,
      });
    } else {
      await axios.post("http://localhost:5000/notes", {
        title,
        content,
      });
    }

    fetchNotes();
    setTitle("");
    setContent("");
    setSelectedId(null);
  };

  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setSelectedId(note.id);
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5000/notes/${id}`);
    fetchNotes();

    if (selectedId === id) {
      setTitle("");
      setContent("");
      setSelectedId(null);
    }
  };

  // AUTO SAVE
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loggedIn && selectedId) {
        saveNote();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [title, content]);

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
  );

  // LOGIN UI
  if (!loggedIn) {
    return (
      <div className="login">
        <div className="login-box">

          <h2>Notes App Login</h2>

          <input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* PASSWORD WITH EYE ICON */}
          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <span onClick={() => setShowPassword(!showPassword)} className="eye">
  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
</span>
          </div>

          <button onClick={handleLogin}>Login</button>

        </div>
      </div>
    );
  }

  return (
    <div className="container">

      {/* SIDEBAR */}
      <div className="sidebar">

        <h2>My Notes</h2>

        <button onClick={logout}>Logout</button>

        <input
          className="search"
          placeholder="Search notes..."
          onChange={(e) => setSearch(e.target.value)}
        />

        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className={`note-item ${
              selectedId === note.id ? "active" : ""
            }`}
            onClick={() => editNote(note)}
          >
            <span>{note.title || "Untitled"}</span>

            <span
              className="delete"
              onClick={(e) => {
                e.stopPropagation();
                deleteNote(note.id);
              }}
            >
              ✕
            </span>
          </div>
        ))}
      </div>

      {/* EDITOR */}
      <div className="editor">

        <input
          className="title"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="split">

          <textarea
            className="textarea"
            placeholder="Write markdown..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

         
        </div>

        <button className="save" onClick={saveNote}>
          {selectedId ? "Update Note" : "Save Note"}
        </button>

      </div>
    </div>
  );
}

export default App;