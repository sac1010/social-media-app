import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from 'axios'
import { useNavigate } from "react-router-dom";



const Register = () => {
    const navigate = useNavigate()
    const[data, setData] = useState({
        username:"",
        email:"",
        password:""
    })
  const handleChange = (e) => {
    setData({
        ...data,
        [e.target.id]:e.target.value
    })
  };
  const registerUser = async()=>{
    try{
        const res = await axios.post(`http://localhost:3001/user/register`, data)
        navigate("/login")

    }catch(err){
        console.log(err)
    }
  }
  return (
    <div
      style={{
        height: "90vh",
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: "75%",
          width: "30%",
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          textAlign:"center"
        }}
      >
        <h1>Register</h1>
        <TextField
          onChange={handleChange}
          label="email"
          id="email"
          variant="outlined"
        />
        <TextField
          onChange={handleChange}
          label="username"
          id="username"
          variant="outlined"
        />
        <TextField
          onChange={handleChange}
          label="password"
          id="password"
          variant="outlined"
          type='password'
        />
        <Button onClick={registerUser} variant="contained">Register</Button>
        
      </div>
    </div>
  );
};

export default Register;
