import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/Storecontext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {
    const {food_list} = useContext(StoreContext)
  return (
    <div className='food-display' id='food-display'>
        <h2>Top Dishes near you</h2>
        <div className="food-display-list">
            {food_list.map((item)=>{
              if(category==="All" || category===item.category){

                return <FoodItem key={item._id} _id={item._id} name={item.name} image={item.image} description={item.description} price={item.price} category={item.category}/>
              }
            })}
        </div>
      
    </div>
  )
}

export default FoodDisplay
