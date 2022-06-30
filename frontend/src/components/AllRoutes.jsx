import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddPost from '../pages/AddPost'
import Home from '../pages/Home'
import Login from '../pages/Login'
import MyPosts from '../pages/MyPosts'
import Register from '../pages/Register'

const AllRoutes = ({setUser}) => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/addPost' element={<AddPost></AddPost>}></Route>
            <Route path='/myPosts/:userId' element={<Home></Home>}></Route>
            <Route path='/login' element={<Login setUser={setUser}></Login>}></Route>
            <Route path='/register' element={<Register></Register>}></Route>
        </Routes>
    </div>
  )
}

export default AllRoutes