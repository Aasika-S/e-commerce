import React, { useState } from 'react'
import './CSS/loginsignup.css'

export default function Loginsignup() {
  const [state,setState]=useState("Signup")
  const [formdata,setFormdata]=useState({
    name:"",
    email:"",
    password:""
  })

  const loginHandle=async()=>{
    console.log("From login function ",formdata)
    let resData;

    await fetch("http://localhost:4000/login",{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formdata)
    }).then((resp)=>resp.json()).then((data)=>resData=data)

    if(resData.success){
      localStorage.setItem('auth-token',resData.token)
      window.location.replace("/")
    }
    else{
      alert(resData.message)
    }
  }
  const signupHandle=async()=>{
    console.log("From signup function ",formdata)
    let resData;

    await fetch("http://localhost:4000/signup",{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formdata)
      }).then((resp)=>resp.json()).then((data)=>resData=data)

      
      if(resData.success){
        localStorage.setItem('auth-token',resData.token)
        window.location.replace("/")
      }
      else{
        alert(resData.message)
      }
  }
  const changeHandler=(e)=>{
    setFormdata({...formdata,[e.target.name]:e.target.value})
  }
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state !== "Login" && (
            <input
              name="name"
              value={formdata.name}
              onChange={changeHandler}
              type="text"
              placeholder="Name"
            />
          )}
          {/* Call functions as fn() if it needs to be called immediately
              Call function just like fn if it needs to be called whenever event occurs
              while passing arguments we have to give it like ()=>fn(arg) */}
          <input
            name="email"
            value={formdata.email}
            onChange={changeHandler}
            className="loginsignup-email"
            type="email"
            placeholder="Email"
          />
          <input
            name="password"
            value={formdata.password}
            onChange={changeHandler}
            className="loginsignup-password"
            type="password"
            placeholder="password"
          />
        </div>
        <button onClick={state == "Login" ? loginHandle : signupHandle}>
          Continue
        </button>
        {state !== "Login" && (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span onClick={() => setState("Login")}>Login</span>{" "}
          </p>
        )}
        {state == "Login" && (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span onClick={() => setState("Signup")}>Signup</span>{" "}
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>I agree to use terms of privacy policy</p>
        </div>
      </div>
    </div>
  );
}
