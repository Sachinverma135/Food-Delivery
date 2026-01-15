
import UserModel from "../models/UserModel.js"

const addToCart = async (req ,res) =>{
  console.log("CART CONTROLLER USER ID:", req.userId);

   try {
    const userData = await UserModel.findById(req.userId);
    console.log("USER FROM DB:", userData);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};
    const itemId = req.body.itemId;

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await UserModel.findByIdAndUpdate(req.userId, { cartData });

    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
  

 const removeFromCart = async (req, res) => {
  try {
    const userData = await UserModel.findById(req.userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData;
    const itemId = req.body.itemId;

    if (cartData[itemId] > 1) {
      cartData[itemId] -= 1;
    } else {
      delete cartData[itemId]; // remove item completely
    }

    await UserModel.findByIdAndUpdate(req.userId, { cartData });

    res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};


 const getCart = async (req, res) => {
  try {
    const userData = await UserModel.findById(req.userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      cartData: userData.cartData
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};


export {addToCart,removeFromCart,getCart}