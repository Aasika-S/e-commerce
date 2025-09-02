import React from 'react'
import './hero.css'
import hand_icon from '../assets/Frontend_Assets/hand_icon.png'
import arrow_icon from '../assets/Frontend_Assets/arrow.png'
import hero_image from '../assets/Frontend_Assets/hero_image.png'



export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
          <div className="hand-hand-icon">
            <p>New</p>
            <img src={hand_icon} alt="" />
          </div>
          <p>collections</p>
          <p>for everyone</p>
        </div>
        <div className="hero-latest-btn">
            <div>Latest collection</div>
            <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="" />
      </div>
    </div>
  );
}
