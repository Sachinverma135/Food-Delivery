import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/Storecontext";

const MyOrders = () => {
  const { url } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          url + "/api/order/user/orders",
          { headers: { token: localStorage.getItem("token") } }
        );

        if (response.data.success) {
          setOrders(response.data.orders);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, [url]);

  return (
    <div style={{ padding: "30px" }}>
      <h1>My Orders</h1>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px"
          }}
        >
          <p><b>Order ID:</b> {order._id}</p>
          <p><b>Status:</b> {order.status}</p>
          <p><b>Payment:</b> {order.payment ? "Paid" : "Pending"}</p>
          <p><b>Total:</b> ₹{order.amount}</p>

          <h4>Items:</h4>
          {order.items.map((item, index) => (
            <p key={index}>
              {item.name} × {item.quantity}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
