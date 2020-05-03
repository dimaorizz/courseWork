const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientsModel = new Schema({
    surname: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    secondName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    successfulDeals: {
        type: Number,
        default: 0
    },
    failedDeals: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('clients', ClientsModel);