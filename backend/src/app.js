const express = require("express");
const cors = require("cors");
const curriculumRoutes = require("./routes/curriculumRoutes");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  }),
);
app.use(express.json());

app.use("/api/curriculum", curriculumRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

module.exports = app;
