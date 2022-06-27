import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import AllRoutes from './components/AllRoutes';
import {toast, ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div >
        <ToastContainer></ToastContainer>
        <Navbar></Navbar>
        <AllRoutes></AllRoutes>
    </div>
  );
}

export default App;
