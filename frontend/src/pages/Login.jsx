import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from "react-toastify";

const Login = ({setUser}) => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email:"",
    password:""
  })
  const handleChange = (e) => {
    setData({
        ...data,
        [e.target.id]:e.target.value
    })
  };
  const userLogin = async()=>{
    try{
        const res = await axios.post(`http://localhost:3001/user/login`, data)
        setUser(res.data)
        localStorage.setItem("user", JSON.stringify(res.data))
        navigate("/")
        toast.success("Logged in successfully")

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
          height: "70%",
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
        <h1>Login</h1>
        <TextField
          onChange={handleChange}
          label="email"
          id="email"
          variant="outlined"
        />
        <TextField
          onChange={handleChange}
          label="password"
          id="password"
          variant="outlined"
          type='password'
        />
        <Button onClick={userLogin} variant="contained">Login</Button>
        <Link to={"/register"}>don't have an account, <br />register here</Link>
      </div>
    </div>
  );
};

export default Login;
