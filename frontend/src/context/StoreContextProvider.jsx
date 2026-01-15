import {  useEffect, useState } from "react";
import axios from 'axios'
 
import { StoreContext } from "./Storecontext";

const StoreContextProvider = (props) => {
  const [cartitems, setCartitems] = useState({});
  const url="https://food-del-backend-q0w3.onrender.com"

  const [token,setToken] = useState()
     
     

  const [food_list,setFoodList] = useState([])

  

  

  const addtocart = async (itemId) => {
     const id = itemId.toString();   // 🔑 convert to string

       if(!token) return

       try {
        const response = await axios.post( `${url}/api/cart/add`,{itemId},{headers:{token}});
        if(response.data.success){
          setCartitems((prev)=>({
            ...prev,
            [id]:prev[id]? prev[id] + 1 : 1,

          }))
        }
       } catch (error) {
        console.log(error)
       }
  };

  const removetocart = async (itemId) => {
     const id = String(itemId);   // normalize only

   if(!token) return

   try {
    const res = await axios.post(
      `${url}/api/cart/remove`,
      {itemId},
      {headers: {token}}
    )
    if(res.data.success){
      setCartitems((prev)=>{
        const updated = {...prev};

        if(updated[id]>1){
          updated[id] -=1
        }
        else{
          delete updated[id]
        }
        return updated
      })}
   } catch (error) {
    console.log("Remove from cart failed",error)
   }
  };

  const getTotalCartAmount = () => {
      let totalAmount = 0;

    for (const id in cartitems) {
      if(cartitems[id]>0){
      const itemInfo = food_list.find(
        (product) => String(product._id) === id
      );

      if (itemInfo) {
        totalAmount += itemInfo.price * cartitems[id];
      }
    }
  }

    return totalAmount
  };

  const fetchFoodList = async () =>{
    const response = await axios.get(url+"/api/food/list")
    console.log(response.data.data)
    setFoodList(response.data.data)
  }

  const loadCartData = async (token) => {
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
    setCartitems(response.data.cartData)
  }
   
useEffect(() => {
  const loadData = async () => {
    await fetchFoodList();
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      await loadCartData(localStorage.getItem("token"))
    }
  };
  loadData();
}, []);

   
  const contextValue = {
    food_list,
    cartitems,
    setCartitems,
    addtocart,
    removetocart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
