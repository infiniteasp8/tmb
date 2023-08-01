// this will handle connection logic to mongodb database
require("dotenv").config();

const mongoose = require('mongoose');
mongoose
.connect('mongodb+srv://anantsharanpandey:Anant888@cluster0.qaaibj4.mongodb.net/?retryWrites=true&w=majority')
.then(()=> console.log(`Connected to MongoDB..`))
.catch((err)=>console.log(err));


// To prevent from depreciation
// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);

module.exports = {
    mongoose
};