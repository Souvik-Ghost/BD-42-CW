const sqlite3 = require("sqlite3").verbose();

// Connect to SQLite database
const db = new sqlite3.Database("./BD4.2_CW/database.sqlite", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Create a movies table with an additional actor and box_office_collection column
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS movies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      director TEXT,
      genre TEXT,
      release_year INTEGER,
      rating REAL,
      actor TEXT,
      box_office_collection REAL
    )`,
    (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
      } else {
        console.log("Movies table created or already exists.");
      }
    },
  );

  // Insert random movie data
  const stmt = db.prepare(
    "INSERT INTO movies (title, director, genre, release_year, rating, actor, box_office_collection) VALUES (?, ?, ?, ?, ?, ?, ?)",
  );

  const movies = [
    // Unique Bollywood Movies
    {
      title: "Dangal",
      director: "Nitesh Tiwari",
      genre: "Biography",
      release_year: 2016,
      rating: 4.8,
      actor: "Aamir Khan",
      box_office_collection: 220.0,
    },
    {
      title: "Baahubali 2: The Conclusion",
      director: "S.S. Rajamouli",
      genre: "Action",
      release_year: 2017,
      rating: 4.7,
      actor: "Prabhas",
      box_office_collection: 181.0,
    },
    {
      title: "PK",
      director: "Rajkumar Hirani",
      genre: "Comedy",
      release_year: 2014,
      rating: 4.6,
      actor: "Aamir Khan",
      box_office_collection: 140.0,
    },
    // ... (rest of your movie data)
  ];

  for (let movie of movies) {
    stmt.run(
      movie.title,
      movie.director,
      movie.genre,
      movie.release_year,
      movie.rating,
      movie.actor,
      movie.box_office_collection,
      (err) => {
        if (err) {
          console.error("Error inserting movie:", err.message);
        } else {
          console.log(`Inserted movie: ${movie.title}`);
        }
      },
    );
  }
  stmt.finalize();

  console.log("Inserted movies into the database.");

  // Close the database connection
  db.close((err) => {
    if (err) {
      console.error("Error closing database:", err.message);
    } else {
      console.log("Database connection closed.");
    }
  });
});
