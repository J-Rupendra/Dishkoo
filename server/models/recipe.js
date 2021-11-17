const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: 'This field is required'
    },
    description:{
        type: String,
        required: 'This field is required'
    },
    email:{
        type: String,
        required: 'This field is required'
    },
    ingredients:{
        type: Array,
        required: 'This field is required'
    },
    category:{
        type: String,
        enum:['Indian','Thai','American','Chinese','Mexican','Spanish'],
        required: 'This field is required'
    },
    image:{
        type: String,
        required: 'This field is required'
    }
})

// indexing for better search
recipeSchema.index({ name: 'text', description: 'text', category: 'text',ingredients: 'text' })

module.exports = mongoose.model('recipe', recipeSchema)