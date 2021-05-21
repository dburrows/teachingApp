const express = require("express");
const app = express();
const port = 3000;

app.get("/hello", (req, res) => {
  console.log(req);
  console.log(res);
  res.send("Hello Wale!");
});

app.get("/hellojson", (req, res) => {
  res.json({ message: "Hello Wale!" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
