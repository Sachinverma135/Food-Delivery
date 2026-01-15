
import fs from "fs"
import foodmodel from "../models/foodModels.js";


const addFood = async(req,res)=>{
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image file is required"
            });
        }
    
     let image_filename = `${req.file.filename}`

     const food = new foodmodel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
     })
    
        await food.save();
        res.json({success:true,message:"Food Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }
}  



const listFood = async(req,res)=>{
    try {
        const foods = await foodmodel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})

    }
}

// remove food item

const removeFood = async(req,res)=>{
    try {
        const food = await foodmodel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodmodel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Food Removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

export {addFood,listFood,removeFood}