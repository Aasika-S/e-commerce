import React, { useState } from "react";
import "./addprod.css";
import upload_area from "../../assets/Admin_Assets/upload_area.svg";

const Addproduct = () => {
  const [image, setImage] = useState(false);
  const [productdeets, setProductdeets] = useState({
    name: "",
    old_price: "",
    new_price: "",
    category: "men",
    image: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };
  const changeHandler = (e) => {
    setProductdeets({ ...productdeets, [e.target.name]: e.target.value });
  };
//   const addproduct = async () => {
//     console.log("Product Details:", productdeets);
//     let responseData;
//     let product = productdeets;

//     //browser automatically sets header type for it
//     let formData = new FormData();
//     formData.append("product", image);

//     try {
//       // 1. Upload the image
//       const uploadResponse = await fetch("http://localhost:4000/upload", {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//         },
//         body: formData,
//       });
//       responseData = await uploadResponse.json();

//       if (responseData.success) {
//         product.image = responseData.image_url;
//         console.log("Product with image URL:", product); 

//         await fetch("http://localhost:4000/addproduct", {
//           method: "POST",
//           headers: {
//             //This header used when the api uses/takes data from body 
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(product),
//         })
//           .then((resp) => resp.json())
//           .then((data) => {
//             data.success
//               ? alert("Product Added")
//               : alert("Failed to Add Product");
//           });
//       }
//     } catch (error) {
//       console.error("Error adding product:", error);
//       alert(
//         "An error occurred. Check the console and make sure your backend server is running."
//       );
//     }
//   };

  const addProd=async ()=>{
    let product=productdeets
    let respData;

    let formdata=new FormData()
    formdata.append('product',image)

    const uploadCall = await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formdata,
    });

    respData=await uploadCall.json()
    if(respData.success){
        product.image=respData.image_url
    }

    const addProdCall = await fetch("http://localhost:4000/addproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const addProdResp=await addProdCall.json()
    if(addProdResp.success) window.alert("New product added")
    else window.alert("Failed to add product")  
    window.location.reload();
    }

    

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          value={productdeets.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Enter here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            type="text"
            value={productdeets.old_price}
            onChange={changeHandler}
            name="old_price"
            placeholder="Enter here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>

          <input
            type="text"
            value={productdeets.new_price}
            onChange={changeHandler}
            name="new_price"
            placeholder="Enter here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product category</p>
        <select
          name="category"
          value={productdeets.category}
          onChange={changeHandler}
          className="addproduct-selector"
        >
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            alt=""
            className="addproduct-thumbnail-img"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button
        onClick={() => {
          addProd();
        }}
        className="addproduct-btn"
      >
        ADD
      </button>
    </div>
  );
};

export default Addproduct;
