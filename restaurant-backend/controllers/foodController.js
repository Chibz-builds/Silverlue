import foodModel from "../models/FoodModel.js";
import fs from 'fs'; 

// ADD FOOD ITEM
const addFood = async (req, res) => {
    try {
        // 1. SAFETY CHECK: Stop crash if image fails
        if (!req.file) {
            return res.json({ success: false, message: "Image is required!" });
        }
        let image_url = req.file.path; 

        // 2. SAFETY CHECK: Convert all inputs to Numbers (default to 0)
        const micro = Number(req.body.micro || 0);
        const mini = Number(req.body.mini || 0);
        const midi = Number(req.body.midi || 0);
        const standard = Number(req.body.standard || 0);
        const foil = Number(req.body.foil || 0);
        const price = Number(req.body.price || 0);

        // 3. BUILD SIZES: Create object if ANY size exists
        let sizesData = undefined;
        if (micro > 0 || mini > 0 || midi > 0 || standard > 0 || foil > 0) {
            sizesData = {
                micro: micro,
                mini: mini,
                midi: midi,
                standard: standard,
                foil: foil
            };
        }

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: price, 
            category: req.body.category,
            image: image_url,
            sizes: sizesData 
        })

        await food.save();
        res.json({success: true, message: "Food Added"})

    } catch (error) {
        console.log("ADD FOOD ERROR:", error); 
        res.json({success: false, message: "Error: " + error.message}) 
    }
}

// LIST ALL FOOD
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success: true, data: foods})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}

// REMOVE FOOD ITEM
const removeFood = async (req, res) => {
    try {
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Food Removed"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}

// UPDATE FOOD ITEM
const updateFood = async (req, res) => {
    try {
        const micro = Number(req.body.micro || 0);
        const mini = Number(req.body.mini || 0);
        const midi = Number(req.body.midi || 0);
        const standard = Number(req.body.standard || 0);
        const foil = Number(req.body.foil || 0);

        let sizesData = undefined;
        if (micro > 0 || mini > 0 || midi > 0 || standard > 0 || foil > 0) {
            sizesData = {
                micro, mini, midi, standard, foil
            };
        }

        let foodData = {
            name: req.body.name,
            description: req.body.description,
            price: Number(req.body.price || 0), 
            category: req.body.category,
            sizes: sizesData 
        };

        if (req.file) {
            foodData.image = req.file.path; 
        }

        if (sizesData) {
            await foodModel.findByIdAndUpdate(req.body.id, foodData);
        } else {
            await foodModel.findByIdAndUpdate(req.body.id, { $set: foodData, $unset: { sizes: "" } });
        }

        res.json({ success: true, message: "Food Updated" });
    } catch (error) {
        console.log("UPDATE ERROR:", error);
        res.json({ success: false, message: "Error: " + error.message });
    }
}


export {addFood, listFood, removeFood, updateFood}
