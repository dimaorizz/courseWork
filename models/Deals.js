const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DealsModel = new Schema({
    carId: {
        type: Schema.Types.ObjectId,
        ref: 'cars',
        required: true
    },
    clientId: {
        type: Schema.Types.ObjectId,
        ref: 'clients',
        required: true
    },
    rentalDays: {
        type: Number,
        default: 1
    },
    history: [
        {
            status: {
                type: String,
                required: true
            },
            agentId: {
                type: Schema.Types.ObjectId,
                ref: 'agents',
                required: true
            },
            branchId: {
                type: Schema.Types.ObjectId,
                ref: 'branches',
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

module.exports = mongoose.model('deals', DealsModel);