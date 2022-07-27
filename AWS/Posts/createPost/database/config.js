const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI)

let db = mongoose.connection

module.exports = db