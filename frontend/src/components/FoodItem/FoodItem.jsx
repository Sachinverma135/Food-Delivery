import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/Storecontext'

const FoodItem = ({_id,name,image,price,description}) => {

  
  const {cartitems, addtocart, removetocart,url} = useContext(StoreContext)
  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className='food-item-image' src={url+"/image/"+image} alt="" />
            {
             !cartitems[_id]
                ?<img className='add' onClick={()=>addtocart(_id)} src={assets.add_icon_white}/>
                :<div className='food-item-counter'>
                  <img onClick={()=>removetocart(_id)} src={assets.remove_icon_red} alt="" />
                  <p>{cartitems[_id]}</p>
                  <img onClick={()=>addtocart(_id)} src={assets.add_icon_green} alt="" />
                </div>
            }
        </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
            <p>{name}</p>
            <img className='star' src={assets.rating_star} alt="" />
        </div>
        <p className='food-item-desc'>{description}</p>
        <p className='food-item-price'> {"\u20B9"}{price}</p>
      </div>
    </div>
  )
}

export default FoodItem
