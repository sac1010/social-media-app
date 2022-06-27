import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddPost from '../pages/AddPost'
import Home from '../pages/Home'
import MyPosts from '../pages/MyPosts'

const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/addPost' element={<AddPost></AddPost>}></Route>
            <Route path='/myPosts' element={<MyPosts></MyPosts>}></Route>
        </Routes>
    </div>
  )
}

export default AllRoutes