const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Company = require("../models/Company");

router.get("/users", function (req, res) {
  User.find({}, function (err, users) {
    Company.populate(users, { path: "company" }, function (err, users) {
      //En caso de que alguna compañia sea eliminada de la base de datos,
      // el atributo "company" de algunos usuarios, apareceria como "null".
      // En la siguiente linea se filtran usuarios, para que los que tengan "null" como atributo, no se muestren.
      const newUsers = users.filter((user) => user.company != null);
      res.status(200).send(newUsers);
    });
  });
});

router.post("/users", async (req, res) => {
  const data = new User(req.body);
  try {
    const dataSaved = await data.save();
    res.status(200).json(dataSaved);
  } catch (error) {
    res.status(500).json({ message: "Error: Datos incorrectos o faltantes" });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findById(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error: Datos incorrectos o faltantes" });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findByIdAndDelete(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error: Datos incorrectos o faltantes" });
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const bookUpdated = req.body;
    const options = { new: true };
    const data = await User.findByIdAndUpdate(id, bookUpdated, options);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error: Datos incorrectos o faltantes" });
  }
});

module.exports = router;
