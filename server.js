require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost/intern-test")
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log(err));

app.use("/api/auth", require("./routers/auth"));
app.use("/api/user", require("./routers/user"));

app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
