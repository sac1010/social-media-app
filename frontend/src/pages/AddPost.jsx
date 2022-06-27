import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

const AddPost = () => {
    const [postData, setPostData] = useState({
        title:"",
        description:"",
        imgUrl:""
    })
  const handleFile = (files) => {
    const formData = new FormData();
    formData.append("file", files);
    formData.append("upload_preset", "qlruhrhr");
    axios
      .post("http://api.cloudinary.com/v1_1/dcmid4z9m/image/upload", formData)
      .then((res) => {
        console.log(res.data.url);
        setPostData({
          ...postData,
          imgUrl: res.data.url,
        });
        toast.info("image uploaded successfully");
      })
      .catch((err) => {
        toast.error("something went wrong");
        console.log(err);
      });
  };
  const handleChange = (e)=>{
    setPostData({
        ...postData,
        [e.target.id]:e.target.value
    })
    console.log(postData)
  }
  return (
    <div
      style={{
        height: "90vh",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "40%",
          justifyContent: "space-around",
          flexDirection: "column",
          alignItems: "center",
          height: "55%",
        }}
      >
        <h1>Create Post</h1>
        <div style={{ marginLeft: "40px" }}>
          <input
            style={{}}
            onChange={(e) => {
              handleFile(e.target.files[0]);
            }}
            type="file"
          />
        </div>

        <TextField onChange={handleChange} value={postData.title} label="Title" id="title" variant="standard" />
        <TextField onChange={handleChange} value={postData.description} label="Description" id="description" variant="standard" />
        <Button variant="contained">Add Post</Button>
      </div>
    </div>
  );
};

export default AddPost;
