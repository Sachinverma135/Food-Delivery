import 'dotenv/config'
import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoutes.js"
import userRouter from "./routes/UserRoutes.js"
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoutes.js';


const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(cors({
    origin:"https://food-del-frontend-ymhw.onrender.com",
    methods:["GET","POST","PUT","DELETE"]
}))

//db connect
connectDB()


console.log("CONNECTED DB NAME:", mongoose.connection.name);
console.log("CONNECTED DB HOST:", mongoose.connection.host);


//api endpoint
app.use("/api/food",foodRouter)
app.use("/image",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("API WORKING")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

