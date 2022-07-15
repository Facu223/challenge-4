const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Company", companySchema);
