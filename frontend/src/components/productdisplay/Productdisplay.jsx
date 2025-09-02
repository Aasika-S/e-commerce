import React, { useContext } from 'react'
import './productdisplay.css'
import start_icon from '../assets/Frontend_Assets/star_icon.png'
import star_dull_icon from '../assets/Frontend_Assets/star_dull_icon.png'
import { ShopContext } from '../../context/Shopcontext'


export default function Productdisplay(props) {
    const {product} =props  
    const {addtocart}=useContext(ShopContext)
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product?.image} alt="" />
          <img src={product?.image} alt="" />
          <img src={product?.image} alt="" />
          <img src={product?.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img
            src={product?.image}
            alt=""
            className="productdisplay-main-img"
          />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product?.name}</h1>
        <div className="productdisplay-right-star">
          <img src={start_icon} alt="" />
          <img src={start_icon} alt="" />
          <img src={start_icon} alt="" />
          <img src={start_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product?.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product?.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis
          delectus voluptates reprehenderit. Vero, eveniet aperiam quae nihil
          quaerat tenetur tempore possimus deleniti explicabo, hic voluptatibus?
        </div>
        <div className="productdisplay-right-size">
          <h1>Select size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
          </div>
        </div>
        <button onClick={()=>addtocart(product.id)}>ADD TO CART</button>
        <p className='productdisplay-right-category'>
            <span>Category:</span> Women, T-shirt, Crop
        </p>
        <p className='productdisplay-right-category'>
            <span>Tags:</span> Modern, latest
        </p>
      </div>
    </div>
  );
}
