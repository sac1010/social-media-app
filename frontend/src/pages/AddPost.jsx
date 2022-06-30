import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../App";
import placeholder from "../placeholder.jpg"

const AddPost = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate()
  const [uploadedImg, setUploadedImage] = useState("/images/placeholder.jpg")
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    imgUrl: "",
    userId: user.id,
  });
  const [image, setImage] = useState("");
  const handleFile = (e) => {
    setImage(e.target.files);
    // const formData = new FormData();
    // formData.append("file", files);
    // formData.append("upload_preset", "qlruhrhr");
    // axios
    //   .post("http://api.cloudinary.com/v1_1/dcmid4z9m/image/upload", formData)
    //   .then((res) => {
    //     console.log(res.data.url);
    //     setPostData({
    //       ...postData,
    //       imgUrl: res.data.url,
    //     });
    //     toast.info("image uploaded successfully");
    //   })
    //   .catch((err) => {
    //     toast.error("something went wrong");
    //     console.log(err);
    //   });
  };
  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.id]: e.target.value,
    });
    console.log(postData);
  };
  const createPost = () => {
    if (postData.title && image) {
      const formData = new FormData();
      formData.append("imgUrl", image[0]);
      formData.append("description", postData.description);
      formData.append("title", postData.title);
      formData.append("userId", postData.userId);
      axios
        .post(`http://localhost:3001/posts`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
         console.log(res.data);
         navigate("/")
        });
    } else {
      toast.error("please fill required fields");
    }
  };
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
          minHeight: "55%",
        }}
      >
        <h1>Create Post</h1>
        <img src={ `http://localhost:3001/${uploadedImg}`} style={{maxHeight:"250px"}} alt="" />
        <div style={{ marginLeft: "40px" }}>
          <input style={{}} onChange={handleFile} type="file" />
        </div>

        <TextField
          onChange={handleChange}
          value={postData.title}
          label="Title"
          id="title"
          variant="standard"
        />
        <TextField
          onChange={handleChange}
          value={postData.description}
          label="Description"
          id="description"
          variant="standard"
        />
        <Button variant="contained" onClick={createPost}>
          Add Post
        </Button>
      </div>
    </div>
  );
};

export default AddPost;
