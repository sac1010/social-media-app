import axios from "axios";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useParams } from "react-router-dom";
import moment from "moment";

const Home = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("DESC");
  useEffect(() => {
    getPosts();
  }, [sort, userId]);

  const getPosts = () => {
    const url = !userId
      ? `http://localhost:3001/posts?sort=${sort}&search=${search}`
      : `http://localhost:3001/posts/${userId}?sort=${sort}&search=${search}`;
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSort = (e) => {
    setSort(e.target.value);
  };
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}
    >
      <div
        style={{
          height: "100px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "15px",
        }}
      >
        <div style={{ display: "flex" }}>
          <TextField
            onChange={handleChange}
            label="search"
            id="title"
            variant="standard"
          />
          <Button onClick={getPosts} size="small">
            {<SearchIcon></SearchIcon>}
          </Button>
        </div>

        <div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">sort</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sort}
              label="sort by date"
              onChange={handleSort}
            >
              <MenuItem value={"DESC"}>newest first</MenuItem>
              <MenuItem value={"ASC"}>oldest first</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      {posts.map((el) => {
        const date  = moment(el.created_at).format('MMMM Do YYYY, h:mm:ss a')
        return (
          <div
            className="card"
            key={el.postId}
            style={{
              width: "30%",
              maxWidth: "400px",
              height: "330px",
              border: "1px solid #d3d3d3",
            }}
          >
            <img
              style={{ width: "100%", height: "70%" }}
              src={`http://localhost:3001/${el.imgUrl}`}
              alt="image"
            />
            <p style={{margin:"10px", fontSize:"12px"}}>{el.title}</p>
            <div style={{fontSize:"10px", margin:"10px"}}>{date}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
