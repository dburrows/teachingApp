const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;

// add middleware to handle json & url encoded payloads, cookies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* SIMPLE TEXT RESPONSE */
app.get("/hello", (req, res) => {
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
app.get("/multiverb", (req, res) => {
  res.json({ method: "GET" });
});
app.post("/multiverb", (req, res) => {
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

app.get("/posts", (req, res) => {
  // Get list of posts
  res.send("to be implemented");
});

app.get("/posts/:uid", (req, res) => {
  // Get post
  res.send("to be implemented");
});

app.post("/posts", (req, res) => {
  // create post
  res.send("to be implemented");
});
// some environments stop you returning any json in the body of a POST, and only allow the uid in the a response header
// it you did want to return JSON in those cases you would have to use a PUT instead

app.patch("/posts/:uid", (req, res) => {
  // update post
  res.send("to be implemented");
});

app.delete("/posts/:uid", (req, res) => {
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
