const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AgentsModel = new Schema({
    branchId: {
        type: Schema.Types.ObjectId,
        ref: 'branches',
        required: true
    },
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
    }
});

module.exports = mongoose.model('agents', AgentsModel);