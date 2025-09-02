import React, { useContext } from 'react'
import { ShopContext } from '../context/Shopcontext'
import { useParams } from 'react-router-dom'
import Breadcrum from '../components/breadcrums/Breadcrum'
import Productdisplay from '../components/productdisplay/Productdisplay'
import Descriptionbox from '../components/descriptionbox/Descriptionbox'
import Relatedproducts from '../components/relatedproducts/Relatedproducts'

export default function Product() {
  const {all_product} = useContext(ShopContext)  
  const {productId}= useParams() //To get that productId from URL.
  //return {productId:"42"}
 const product = all_product.find((e) => String(e.id) === productId);

  return (
    <div>
      <Breadcrum product={product} />
      <Productdisplay product={product} />
      <Descriptionbox/>
      <Relatedproducts/>
    </div>
  )
}
