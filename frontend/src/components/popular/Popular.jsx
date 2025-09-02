import React, { useEffect, useState } from 'react'
import './popular.css'
import data_product from '../assets/Frontend_Assets/data.js'
import Item from '../item/Item'


export default function Popular() {
  const [data_product,setDataproduct]=useState([])
  useEffect(()=>{
    //.then() style: attach a callback to run when the promise resolves.
    //Other style: pause the function until the promise resolves, then give you the resolved value.
    //Other style written only using async await
    fetch("http://localhost:4000/popularwoman").then((resp)=>resp.json()).then((data)=>setDataproduct(data))
  },[])
  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />

      <div className="popular-item">
        {data_product.map((item,i) =>{
            return (
              <Item
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
        })}
      </div>
    </div>
  )
}
