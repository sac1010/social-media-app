import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Navbar = ({ setUser }) => {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user = useContext(UserContext);
  
  const handleLogout = ()=>{
    setUser("")
    localStorage.removeItem("user")
    setOpen(false)
    toast.info("logged out")
    navigate("/")

  }
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
      <div style={{ margin: "10px" }}>
        <NavLink to={"/"}>Home</NavLink>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "10px",
          gap:"40px",
          width: "30%",
        }}
      >
        {user&&<NavLink to={`/myPosts/${user.id}`}>My Posts</NavLink>}
        {user&&<NavLink to={"/addPost"}>Add Post</NavLink>}
        {user ? (
          <div style={{ cursor: "pointer", display:"flex",  }} onClick={handleOpen}>
            <AccountCircleIcon></AccountCircleIcon>
            {user.username}
          </div>
        ) : (
          <NavLink to={"/login"}>{"Login"}</NavLink>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={{ textAlign: "center" }} sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Logout
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button onClick={handleLogout}>Logout</Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Navbar;
