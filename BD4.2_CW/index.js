let express = require("express");
let app = express();
let port = 3000;
let db;
let sqlite3 = require("sqlite3");
let { open } = require("sqlite");
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// Connect to SQLite database
(async () => {
  db = await open({
    filename: "./BD4.2_CW/database.sqlite",
    driver: sqlite3.Database,
  });
  if (db) console.log("Connected to the SQLite database.");
})();
//Message
app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.2 CW Error Handling" });
});

// THE ENPOINTS
//1
async function fatchAllMovies() {
  let query = "SELECT * FROM movies";
  let response = await db.all(query, []);
  return { movies: response };
}
app.get("/movies", async (req, res) => {
  try {
    let result = await fatchAllMovies();
    if (result.movies.length === 0) {
      return res.status(404).json({ message: "No movies found." });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//movies

//2
async function fetcheMoviesByGenre(genre) {
  let query = "SELECT * FROM movies WHERE genre = ?";
  let response = await db.all(query, [genre]);
  return { movies: response };
}
app.get("/movies/genre/:genre", async (req, res) => {
  try {
    let genre = req.params.genre;
    let result = await fetcheMoviesByGenre(genre);
    if (result.movies.length === 0) {
      return res
        .status(404)
        .json({ message: "No movies of this genre found." });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//movies/genre/Biography

//3
async function fatcheMoviesById(id) {
  let query = "SELECT * FROM movies WHERE id = ?";
  let response = await db.get(query, [id]);
  return { movies: response };
}
app.get("/movies/details/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let results = await fatcheMoviesById(id);
    if (results.movies === undefined) {
      return res.status(404).json({ message: "Movie not found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//movies/details/2

//4
async function fatchMoviesByReleaseYear(releaseYear) {
  let query = "SELECT * FROM movies WHERE release_year = ?";
  let response = await db.all(query, [releaseYear]);
  return { movies: response };
}
app.get("/movies/release-year/:Year", async (req, res) => {
  try {
    let releaseYear = req.params.Year;
    let result = await fatchMoviesByReleaseYear(releaseYear);
    if (result.movies.length === 0) {
      return res.status(404).json({ message: "No movies found." });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//movies/release-year/2015