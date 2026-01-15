import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/Storecontext";


const PayPalCheckout = () => {
  const navigate = useNavigate();
  const { url } = useContext(StoreContext);

  const localOrderId = localStorage.getItem("localOrderId");

  const onApprove = async (data,actions) => {
    try {
      await actions.order.capture()

      await axios.post(
        url + "/api/order/capture",
        { paypalOrderId: data.orderID, localOrderId },
        { headers: { token: localStorage.getItem("token") } }
      );

      alert("Payment Successful!");
      navigate("/success");
    } catch (error) {
      console.error(error);
      alert("Payment failed");
    }
  };

  return (
    <PayPalScriptProvider
      options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}
    >
      <PayPalButtons
        createOrder={() => {
          const orderId = localStorage.getItem("paypalOrderId");
          if (!orderId) throw new Error("Missing PayPal Order ID");
          return Promise.resolve(orderId);
        }}
        onApprove={onApprove}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalCheckout;
