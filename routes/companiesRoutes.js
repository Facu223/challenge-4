require("dotenv").config();
const express = require("express");
const router = express.Router();
const Company = require("../models/Company");
const { companyNotFound, incorrectData } = require("../errMessages/errMessages");

// GET all companies
router.get("/companies", async (req, res) => {
  const data = await Company.find();
  res.status(200).json(data);
});

// CREATE one user
router.post("/companies", async (req, res) => {
  const data = new Company(req.body);
  try {
    const dataSaved = await data.save();
    res.status(200).json(dataSaved);
  } catch (error) {
    res.status(500).json(incorrectData);
  }
});

// GET one company
router.get("/companies/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Company.findById(id);
    if (data) {
      res.status(200).json(data);
      return;
    }
    res.status(500).json(companyNotFound);
  } catch (error) {
    res.status(500).json(companyNotFound);
  }
});

// DELETE one company
router.delete("/companies/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Company.findByIdAndDelete(id);
    if (data) {
      res.status(200).json(data);
      return;
    }
    res.status(500).json(companyNotFound);
  } catch (error) {
    res.status(500).json(companyNotFound);
  }
});

// EDIT one company
router.put("/companies/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const bookUpdated = req.body;
    const options = { new: true };
    const data = await Company.findByIdAndUpdate(id, bookUpdated, options);
    if (data) {
      res.status(200).json(data);
      return;
    }
    res.status(500).json(companyNotFound);
  } catch (error) {
    res.status(500).json(companyNotFound);
  }
});

module.exports = router;
