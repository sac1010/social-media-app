import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div
      style={{
        width: "100%",
        color: "white",
        background: "black",
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        
      }}
    >
      <div style={{margin:"10px"}}>
      <Link to={"/"}>Home</Link>
      </div>
      <div style={{display:"flex", justifyContent:'space-around', width:"30%"}}>
        <Link to={"/myPosts"}>My Posts</Link>
        <Link to={"/addPost"}>Add Post</Link>
        <Link to={""}>Profile</Link>
        <Link to={""}>Login</Link>
      </div>
    </div>
  );
};

export default Navbar;
