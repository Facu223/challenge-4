const express = require("express");
const router = express.Router();
const Company = require("../models/Company");

router.get("/companies", async (req, res) => {
  const data = await Company.find();
  res.status(200).json(data);
});

router.post("/companies", async (req, res) => {
  const data = new Company(req.body);
  try {
    const dataSaved = await data.save();
    res.status(200).json(dataSaved);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

router.get("/companies/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Company.findById(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

router.delete("/companies/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Company.findByIdAndDelete(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

router.put("/companies/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const bookUpdated = req.body;
    const options = { new: true };
    const data = await Company.findByIdAndUpdate(id, bookUpdated, options);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

module.exports = router;
