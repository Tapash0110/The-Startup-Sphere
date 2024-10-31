const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    location: {
        type: [String]
    }
})

module.exports = mongoose.model("data", DataSchema);