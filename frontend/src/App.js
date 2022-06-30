import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import AllRoutes from "./components/AllRoutes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext, useState } from "react";
export const UserContext = createContext();

function App() {
  
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || "");
  return (
    <div>
      <UserContext.Provider value={user}>
        <ToastContainer></ToastContainer>
        <Navbar setUser={setUser}></Navbar>
        <AllRoutes setUser={setUser}></AllRoutes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
