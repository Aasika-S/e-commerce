import React, { createContext, useEffect, useState } from "react";

//Initializing context w null
export const ShopContext=createContext(null)
  //Create empty cart. key-val=productid-quantity
    const getdefaultcart=()=>{
        let cart={};
        for(let i=0;i<300+1;i++){
            cart[i]=0;
        }
        return(cart)
    }

const Shopcontextprovider=(props)=>{
    //To store the data we want in context and access it from anywhere.
    //Now all product data can be accessed from anywhere.
    //<App/> in index, wrapped by it.
    const [cartitems,setCartitems]=useState(getdefaultcart())
    const [all_product,setAllproduct]=useState([])

    useEffect(()=>{
        fetch("http://localhost:4000/allproducts").then((resp)=>resp.json()).then((data)=>setAllproduct(data))

        if(localStorage.getItem('auth-token')){
            fetch("http://localhost:4000/getcartdata",{
                method:'POST',
                headers:{
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json'
                },
                body:""
            }).then((resp)=>resp.json()).then((data)=>setCartitems(data))          
        }

    },[]) //[] means, useEffect runs when component is mounted
    

    const addtocart=(itemId)=>{
        setCartitems((prev)=>({
            ...prev,
            [itemId]:prev[itemId]+1}))
        console.log("Cart after add: ",cartitems)  
        
        if(localStorage.getItem('auth-token')){
            fetch("http://localhost:4000/addtocart",{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    "content-type":'application/json',
                    "auth-token":`${localStorage.getItem('auth-token')}`
                },
                body:JSON.stringify({
                    id:itemId
                })        
        }).then((resp)=>resp.json()).then((data)=>console.log("Hi fe"+data))
        }
    }
    const removefromcart=(itemId)=>{
        setCartitems((prev)=>({
            ...prev,
            [itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch("http://localhost:4000/removefromcart", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "content-type": "application/json",
                "auth-token": `${localStorage.getItem("auth-token")}`,
              },
              body: JSON.stringify({
                id: itemId,
              }),
            })
              .then((resp) => resp.json())
              .then((data) => console.log("Hi fe" + data));
        }    
    }

    const gettotalcartamount=()=>{
        let totalamt=0;
        for(const items in cartitems){
            if(cartitems[items]>0){
                let req_item=all_product.find((product)=>product.id===Number(items))
                totalamt+=(req_item.new_price*cartitems[items])
            }
        }
        return(totalamt)
    }

    const cartquantity=()=>{
        let totalquant=0;
        for(const items in cartitems) totalquant+=cartitems[items]
        return totalquant<=5?totalquant:"5+";
    }

    const contextval = {
      all_product,
      cartitems,
      addtocart,
      removefromcart,
      gettotalcartamount,
      cartquantity,
    };

    return(
        <ShopContext.Provider value={contextval}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default Shopcontextprovider;
