const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Skill = require("./models/skill"); 
const Project = require("./models/project");
const Review = require("./models/review");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://mongo:27017/db1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("MongoDB verbonden!"));

// API TEST
app.get("/api", (req, res) => {
  console.log('testing')
  res.json({ message: "Hallo vanaf de backend!" });
});

// API SKILLS
app.get("/skills", async (req, res) => {
  try {
    const skills = await Skill.find(); // Haal alle records op
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: "Fout bij ophalen van skills", error });
  }
});

app.listen(5000, () => console.log("Server draait op poort 5000"));

// API Projects
app.get("/projects", async (req, res) => {
  try {
    
    const projecten = await Project.find(); // Haal alle records op
    res.json(projecten);
  } catch (error) {
    res.status(500).json({ message: "Fout bij ophalen van projecten", error });
  }
});



// API REVIEWS
app.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Fout bij ophalen van reviews", error });
  }
});

app.post("/reviews", async (req, res) => {
  try {
    const { rating, text } = req.body;
    const newReview = new Review({ rating, text });
    await newReview.save();
    res.json({ message: "Review opgeslagen!" });
  } catch (error) {
    res.status(500).json({ message: "Fout bij opslaan van review", error });
  }
});
