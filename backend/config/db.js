import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://sachinsssty123:sachin123@cluster0.bm5r8rr.mongodb.net/food-del').then(()=>console.log("DB Connected"));

}