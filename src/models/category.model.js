const { default: mongoose } = require("mongoose");

const CategorySchema =new mongoose.Schema({
    name: {
        type:'string',
        unique: true
    },
    description:'string'
});

const categoryModel = mongoose.model('Category', CategorySchema)

module.exports = categoryModel;