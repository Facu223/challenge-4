require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Company = require("../models/Company");
const { userNotFound, incorrectData } = require("../errMessages/errMessages");

// GET all users
router.get("/users", function (req, res) {
  User.find({}, function (err, users) {
    // populate: permite mostrar los atributos de la compañia relacionada al usuario
    Company.populate(users, { path: "company" }, function (err, users) {
      res.status(200).send(users);
    });
  });
});

// CREATE one user
router.post("/users", async (req, res) => {
  const data = new User(req.body);
  try {
    const dataSaved = await data.save();
    res.status(200).json(dataSaved);
  } catch (error) {
    res.status(500).json(incorrectData);
  }
});

// GET one user
router.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findById(id);
    if (data) {
      res.status(200).json(data);
      return;
    }
    res.status(500).json(userNotFound);
  } catch (error) {
    res.status(500).json(userNotFound);
  }
});

// DELETE one user
router.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findByIdAndDelete(id);
    if (data) {
      res.status(200).json(data);
      return;
    }
    res.status(500).json(userNotFound);
  } catch (error) {
    res.status(500).json(userNotFound);
  }
});

// EDIT one user
router.put("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const bookUpdated = req.body;
    const options = { new: true };
    // Esta valifación fue agregada debido a que a la hora de editar un user,
    // me permitia enviarle el valor null, a cualquiera de las propiedades.
    if (
      bookUpdated.company != null &&
      bookUpdated.name != null &&
      bookUpdated.email != null &&
      bookUpdated.userName != null
    ) {
      const data = await User.findByIdAndUpdate(id, bookUpdated, options);
      if (data) {
        res.status(200).json(data);
        return;
      }
    } else {
      res.status(500).json(incorrectData);
      return;
    }
  } catch (error) {
    res.status(500).json(incorrectData);
  }
});

module.exports = router;
