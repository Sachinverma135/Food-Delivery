import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/Storecontext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartitems, food_list, removetocart, getTotalCartAmount ,url} = useContext(StoreContext);
  const navigate = useNavigate()
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          const id = String(item._id);
           const quantity = cartitems[id] ?? 0;
          if (!quantity) return null; 
            return (
      <div key={id}>
      <div className="cart-items-title cart-items-items">
        <img src={url+"/image/"+item.image} alt="" />
        <p>{item.name}</p>
        <p>₹{item.price}</p>
        <p>{quantity}</p>
        <p>{item.price * quantity}</p>
        <p onClick={() => removetocart(id)} className="cross">
          x
        </p>
      </div>
      <hr />
    </div>
            );
          
        })}
      </div>
    <div className="cart-bottom">
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
            <p>₹{getTotalCartAmount()===0?0:10}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+10}</b>
          </div>
        </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
      </div>
    <div className="cart-promocode">
      <div>
        <p>If you have a promo code, Enter it here</p>
        <div className="cart-promocode-input">
          <input type="text" placeholder="promo code" />
          <button>submit</button>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Cart;
