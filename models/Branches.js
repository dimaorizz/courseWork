const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BranchesModel = new Schema({
    country: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    adress: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('branches', BranchesModel);