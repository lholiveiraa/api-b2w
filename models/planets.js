module.exports = (app) => {

const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


const planetSchema = new Schema ({
    // _id
    nome: {
        type: String,
        required: true,
        index: true
    },
    clima: { 
        type: String,
        required: true
    },
    terreno: {
        type: String,
        required: true,
    }
});


mongoose.model('Planet', planetSchema);
}
