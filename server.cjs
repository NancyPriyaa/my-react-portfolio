const express = require('express');

const sqlite3 = require('sqlite3').verbose();

const cors = require('cors');

const path = require('path');

const projects = [
  {
    name: "Vibe UP",
    description:
      "Web-based platform that allows users to play , add and create new playlists of their choice of songs. This project is made using html, css, javascript, Bootstrap, Mysql. ",
    tags: "a b c",
      image: "carrent.png",
    source_code_link: "httpshttps://github.com/NancyPriyaa/projects://github.com/",
  },
  {
    name: "IT Consultancy",
    description:
      "Web application that https://github.com/NancyPriyaa/projects using HTML, CSS, Javascript and Bootstrap .",
    tags: "react restapi scss",
    image: "jobit.png",
    source_code_link: "https://github.com/NancyPriyaa/IT_CONSULTANCY",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: "nextjs supabase css",
    image: "tripguide.png",
    source_code_link: "https://github.com/",
  },
]

// Open a SQLite database (or create a new one if it doesn't exist)
const db = new sqlite3.Database('./mydatabase.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');

    // Create a table for projects
    db.run(`CREATE TABLE IF NOT EXISTS projects (
      name TEXT,
      description TEXT,
      tags TEXT,
      image TEXT,
      source_code_link TEXT
    )`, (createErr) => {
      if (createErr) {
        console.error('Error creating the projects table:', createErr.message);
      } else {
        console.log('Projects table created successfully.');
      }
    });
    // db.run(`DELETE from projects`);
    projects.map((project) => {
      db.run(`INSERT OR REPLACE INTO projects VALUES (?, ?, ?, ?, ?)`, [
        project.name,
        project.description,
        project.tags,
        project.image,
        project.source_code_link
      ]);
    });
  }
});

// Export the database object

const app = express();

app.use(cors());

// Define a route to fetch data from the database
app.get('/getData', (req, res) => {
  db.all('SELECT * FROM projects', [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

app.use('/image', express.static(path.join(__dirname, 'src', 'assets')));

// Start your Express server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
