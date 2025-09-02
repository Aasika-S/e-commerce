import React, { useEffect, useState } from 'react'
import './newcollections.css'
import Item from '../item/Item'

export default function Newcollections() {
  const [new_collections,setNewcollections]=useState([])
  useEffect(()=>{
    fetch("http://localhost:4000/newcollections").then((resp)=>resp.json()).then((data)=>setNewcollections(data))
  },[])
  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />

      <div className="collections">
        {new_collections.map((item,i) =>{
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
