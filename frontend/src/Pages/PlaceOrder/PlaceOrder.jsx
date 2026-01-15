import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/Storecontext";
import axios from "axios";
import PayPalCheckout from "../../components/Paypalcheckout";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartitems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [showPaypal, setShowPayPal] = useState(false);
  // const subtotal = getTotalCartAmount()
  // const deliveryfee = subtotal === 0?0:10
  // const total = subtotal + deliveryfee

  const onchangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    const orderItems = food_list
      .filter((item) => cartitems[item._id] > 0)
      .map((item) => ({
        ...item,
        quantity: cartitems[item._id],
      }));

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 10,
    };
    try {
      const response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });

      console.log("Order response:", response.data);

      if (response.data.success) {
        localStorage.setItem("paypalOrderId", response.data.paypalOrderId);
        localStorage.setItem("localOrderId", response.data.localOrderId);
        setShowPayPal(true);
      }
    } catch (error) {
      console.log(error);
      alert("Order failed");
    }
  };

   
  


  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onchangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First name"
          />
          <input
            required
            name="lastName"
            onChange={onchangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last name"
          />
        </div>

        <input
          required
          name="email"
          onChange={onchangeHandler}
          value={data.email}
          type="email"
          placeholder="Email address"
        />
        <input
          required
          name="street"
          onChange={onchangeHandler}
          value={data.street}
          type="text"
          placeholder="street"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onchangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onchangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={onchangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip Code"
          />
          <input
            required
            name="country"
            onChange={onchangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onchangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 10}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 10}
              </b>
            </div>
          </div>
          {!showPaypal && <button type="submit">PROCEED TO PAYMENT</button>}
          {showPaypal && localStorage.getItem("paypalOrderId") && (
            <PayPalCheckout />
          )}
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
