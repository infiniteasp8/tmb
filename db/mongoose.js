// this will handle connection logic to mongodb database

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://0.0.0.0:27017/TaskManager', { useNewUrlParser: true }).then(() => {
    console.log("Connceted to Mongo Succesfully");
}).catch((e) => {
    console.log("Error while connecting");
    console.log(e);

});

// To prevent from depreciation
// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);

module.exports = {
    mongoose
};