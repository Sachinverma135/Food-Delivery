import express from "express"
import authMiddleware from "../middleware/auth.js"
import { capturePayment, getSingleOrder, placeOrder } from "../controllers/orderController.js"

const orderRouter = express.Router()

orderRouter.post("/place",authMiddleware,placeOrder)
orderRouter.post("/capture",authMiddleware,capturePayment)
orderRouter.get("/:id",authMiddleware,getSingleOrder )

export default orderRouter