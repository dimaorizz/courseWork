const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarsModel = new Schema({
    branchId: {
        type: Schema.Types.ObjectId,
        ref: 'branches',
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('cars', CarsModel);