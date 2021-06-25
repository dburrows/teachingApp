require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const pg = require("pg");

// create app
const app = express();
const port = 3000;

// add middleware to handle json & url encoded payloads, cookies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

// db
const Pool = pg.Pool;
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

/* SIMPLE TEXT RESPONSE */
app.get("/hello", (_req, res) => {
  res.send("Hello World!"); // sends as text/html - text string is a valid HTML document
});

/* USING REQ OBJECT */
//`use` will respond to any request on that path
app.use("/helloany", (req, res) => {
  if (req.method === "GET") {
    res.json({ message: "Hello JSON!" });
  } else {
    res.json({ message: "Hello JSON!" });
  }
});

/* MULTIPLE VERBS ON THE SAME PATH */
// easier way to doing above
app.get("/multiverb", (_req, res) => {
  res.json({ method: "GET" });
});
app.post("/multiverb", (_req, res) => {
  res.json({ method: "POST" });
});

/* BASIC CRUD FOR AN API */

/*
  Most api's consist of four action - Create, Read, Update, Delete, referred to as CRUD
  The actions map to HTTP verbs, so we can make an api by implementing handlers for each
  of the verbs.

  METHOD  |  HTTP Verb
  ----------------------------
  Create  |  POST (or PUT, see above)
  Read    |  GET
  Update  |  PATCH
  Delete  |  DELETE

*/

app.get("/api/posts", async (_req, res) => {
  // Get list of posts
  try {
    const result = await pool.query("SELECT * FROM posts ORDER BY id DESC"); // give me all the post in descending id order
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("500 Server Error");
  }
});

app.get("/api/posts/:id", (req, res) => {
  // Get post
  // id will be in req.params.id
  res.send("to be implemented");
});

app.post("/api/posts", (req, res) => {
  // create post
  console.log(req.body);
  res.send("to be implemented");
});
// some environments stop you returning any json in the body of a POST, and only allow the uid in the a response header
// it you did want to return JSON in those cases you would have to use a PUT instead

app.put("/api/posts/:id", (_req, res) => {
  // update post
  res.send("to be implemented");
});

app.delete("/api/posts/:id", (_req, res) => {
  // delete post
  res.send("to be implemented");
});

/*
  What      HTTP Verb
  Read      GET
  Create    POST (or PUT, see above)
  Update    PATCH
  Delete    DELETE
*/

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
