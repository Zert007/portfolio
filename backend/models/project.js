const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  Title: String,
  beschrijving: String,
  Tags: [String]
});

module.exports = mongoose.model("Project", ProjectSchema);