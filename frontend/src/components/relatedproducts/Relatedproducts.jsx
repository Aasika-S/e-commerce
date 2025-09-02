import React from 'react'
import data_product from '../assets/Frontend_Assets/data'
import './relatedproducts.css'
import { data } from 'react-router-dom'
import Item from '../item/Item'

export default function Relatedproducts() {
  return (
    <div className='relatedproducts'>
      <h1>Related products</h1>
      <hr />

      <div className="relatedproducts-item">
        {data_product.map((item)=>{
            return <Item
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            image={item.image}
                            new_price={item.new_price}
                            old_price={item.old_price}
                          />
        })}
      </div>
    </div>
  )
}
