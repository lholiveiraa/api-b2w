module.exports = (app) => {

const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://admin:admin@cluster0-scxbz.mongodb.net/ame', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

}