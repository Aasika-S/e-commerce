import React from 'react'
import './offers.css'
import exclusive_image from '../assets/Frontend_Assets/exclusive_image.png'

export default function Offers() {
  return (
    <div className='offers'>
      <div className="offers-left">
        <h1>Exclusive</h1>
        <h1>Offers for you</h1>
        <p>ONLY ON BEST SELLER PRODUCTS</p>
        <button>SHOP NOW</button>
      </div>
      <div className="offers-right">
        <img src={exclusive_image} alt="" />
      </div>
    </div>
  )
}
