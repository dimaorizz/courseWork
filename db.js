const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(err) {
        return console.log('Mongodb Connection error: ', err);
    } else {
        console.log('MongoDB connected successfuly');
    }
});