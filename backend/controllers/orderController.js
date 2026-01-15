import orderModel from "../models/orderModel.js";
import paypal from "@paypal/checkout-server-sdk";
import paypalclient from "../config/paypal.js";
import userModel from "../models/UserModel.js";

const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const newOrder = new orderModel({
      userId: req.userId,
      items,
      amount,
      address,
      payment: false,
      status: "Pending",
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

    const deliverycharge = 2;

    const itemTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const rate = 0.012; // INR → USD

    // Convert each item to USD FIRST
    const paypalItems = items.map((item) => {
      const unitUSD = (item.price * rate).toFixed(2);
      return {
        name: item.name,
        unit_amount: {
          currency_code: "USD",
          value: unitUSD,
        },
        quantity: item.quantity.toString(),
      };
    });

    // Now calculate item_total from PayPal items
    let usdItemTotal = 0;
    paypalItems.forEach((item) => {
      usdItemTotal += Number(item.unit_amount.value) * Number(item.quantity);
    });
    usdItemTotal = usdItemTotal.toFixed(2);

    // Delivery
    const deliveryCharge = 2;
    const usdDelivery = (deliveryCharge * rate).toFixed(2);

    // Final total
    const usdTotal = (Number(usdItemTotal) + Number(usdDelivery)).toFixed(2);

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: usdTotal,
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: usdItemTotal,
              },
              shipping: {
                currency_code: "USD",
                value: usdDelivery,
              },
            },
          },
          items: paypalItems,
        },
      ],
    });

    const response = await paypalclient.execute(request);

    res.json({
      success: true,
      paypalOrderId: response.result.id,
      localOrderId: newOrder._id,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "order failed" });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paypalOrderId, localOrderId } = req.body;

    const request = new paypal.orders.OrdersCaptureRequest(paypalOrderId);
    request.requestBody({});

    const capture = await paypalclient.execute(request);

    if (capture.result.status !== "COMPLETED") {
      return res.json({ success: false, message: "Payment not completed" });
    }

    await orderModel.findByIdAndUpdate(localOrderId, {
      payment: true,
      status: "Paid",
    });

    res.json({ success: true, message: "Payment captured" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Capture failed" });
  }
};

const  getSingleOrder = async(req,res) =>{
  try{
    const order = await orderModel.findById(req.params.id)
    res.json({success: true, order})
  }
  catch(error){
    res.json({success:false, message:"Order not found"})
  }
}

export { placeOrder, capturePayment, getSingleOrder };
