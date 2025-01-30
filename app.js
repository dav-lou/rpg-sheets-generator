const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.static("public"));

const readJsonFile = (jsonFilePath) => {
  return JSON.parse(fs.readFileSync(jsonFilePath));
};

app.get("/names", (req, res) => {
  const names = readJsonFile("data/names.json");
  res.json(names);
});

app.get("/surnames", (req, res) => {
  const surnames = readJsonFile("data/surnames.json");
  res.json(surnames);
});

app.get("/occupations", (req, res) => {
  const occupations = readJsonFile("data/occupations.json");
  res.json(occupations);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
