import React from 'react'
import './sidebar.css'
import {Link} from 'react-router-dom'
import add_prod_icon from '../../assets/Admin_Assets/Product_Cart.svg'
import list_prod_icon from '../../assets/Admin_Assets/Product_list_icon.svg'


const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/addproduct'} style={{textDecoration: 'none'}}>
            <div className="sidebar-item">
              <img src={add_prod_icon} alt="" className="sidebar-icon" />
              <p className="sidebar-text">Add Product</p>
            </div>
      </Link>
      <Link to={'/listproducts'} style={{textDecoration: 'none'}}>
            <div className="sidebar-item">
              <img src={list_prod_icon} alt="" className="sidebar-icon" />
              <p className="sidebar-text">Product List</p>
            </div>
      </Link>
    </div>
  )
}

export default Sidebar
