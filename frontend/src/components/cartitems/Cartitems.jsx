import React,{useContext} from 'react'
import './cartitems.css'
import { ShopContext } from '../../context/Shopcontext'
import remove_icon from '../assets/Frontend_Assets/cart_cross_icon.png'

export default function Cartitems() {
    const {all_product,cartitems,removefromcart, gettotalcartamount}=useContext(ShopContext)
  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Remove</p>
      </div>
      <hr />
      <div>
        {all_product.map((e) => {
          if (cartitems[e.id] > 0) {
            return (
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p>{e.name}</p>
                <p>{e.new_price}</p>
                <button className="cartitems-quantity">
                  {cartitems[e.id]}
                </button>
                <p>{e.new_price * cartitems[e.id]}</p>
                <img
                  className="carticons-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removefromcart(e.id);
                  }}
                  alt=""
                />
              </div>
            );
          }
          return null
        })}
      </div>
      <div className="cartitems-down">
        <div className="cartitems-total">
            <h1>Cart totals</h1>
            <div>
                <div className="cartitems-total-item">
                    <p>Subtotal</p>
                    <p>${gettotalcartamount()}</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <p>Shipping fee</p>
                    <p>Free</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <h3>Total</h3>
                    <h3>${gettotalcartamount()}</h3>
                </div>
            </div>
            <button>Proceed to checkout</button>
        </div>
        <div className="cartitems-promocode">
            <p>Enter promo code here</p>
            <div className="cartitems-promobox">
                <input type="text" placeholder='promo code' />
                <button>Submit</button>
            </div>
        </div>
      </div>
    </div>
  );
}
