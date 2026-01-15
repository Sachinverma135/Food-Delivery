 import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/Storecontext";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const { url } = useContext(StoreContext);
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  const localOrderId = localStorage.getItem("localOrderId");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          url + "/api/order/" + localOrderId,
          { headers: { token: localStorage.getItem("token") } }
        );
        console.log("Order response",response.data)
        setOrder(response.data.order);
      } catch (error) {
        console.log(error);
      }
    };

    if (localOrderId) {
      fetchOrder();
    }
  }, [localOrderId,url]); // ✅ IMPORTANT

  if (!order) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h1 style={{ color: "green" }}>✅ Payment Successful</h1>

      <h3>Order ID: {order._id}</h3>
      <p>Status: {order.status}</p>
      <p>Total Amount: ₹{order.amount}</p>

      <h2>Items:</h2>
      {order.items.map((item, index) => (
        <div key={index}>
          <p>
            {item.name} × {item.quantity}
          </p>
        </div>
      ))}

      <button onClick={() => navigate("/order")}>
        View My Orders
      </button>
    </div>
  );
};

export default Success;
