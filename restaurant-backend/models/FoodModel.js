import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    category: {type: String, required: true},
    
    // Allow 'standard' and 'foil' to be stored
    sizes: {
        micro: {type: Number, default: 0},
        mini: {type: Number, default: 0},
        midi: {type: Number, default: 0},
        standard: {type: Number, default: 0}, 
        foil: {type: Number, default: 0}
    }
}, { minimize: false }) 

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;