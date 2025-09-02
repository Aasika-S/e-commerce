import React, { useEffect, useState } from 'react'
import './listprod.css'
import cross_icon from '../../assets/Admin_Assets/cross_icon.png'

const Listproduct = () => {
  const [products,setProducts]=useState([])
  const getAllprods=async () =>{
    let resData;
    const allprodsCall=await fetch('http://localhost:4000/allproducts',{
        headers:{
            Accept:'application/json'
        }
  })
  resData=await allprodsCall.json()
  console.log("All prod call madeeeee",resData)
  setProducts(resData)
  }
  
  useEffect(()=>{
    getAllprods()
  },[])

  const removeProd=async (id)=>{
    const removeCall=await fetch('http://localhost:4000/removeproduct',{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            id:id
        })
    })
        
    const resp=await removeCall.json()
    await getAllprods()
    if(resp.success) window.alert("Product removed")
    else window.alert("Failed to remove product")      
  }
  
  return (
    <div className='listproduct'>
      <h1>All products List</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old price</p>
        <p>New price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {products.map((product)=>{
            return (
              <>
                <div
                  key={product.id}
                  id={product.id}
                  className="listproduct-format-main listproduct-format"
                >
                  <img
                    src={product.image}
                    alt=""
                    className="listproduct-product-icon"
                  />
                  <p>{product.name}</p>
                  <p>{product.old_price}</p>
                  <p>{product.new_price}</p>
                  <p>{product.category}</p>
                  <img
                    className="listproduct-remove-icon"
                    src={cross_icon}
                    onClick={()=>{removeProd(product.id)}}
                    alt=""
                  />
                </div>
                <hr />
              </>
            );
            
        })}
      </div>
    </div>
  )
}

export default Listproduct
