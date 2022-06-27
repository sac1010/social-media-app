import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = () => {
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:3001/posts`).then((res)=>{
            console.log(res.data)
            setPosts(res.data.response)
        }).catch((err)=>{
            console.log(err)
        })
    },[])
  return (
    <div style={{display:"flex", gap:"20px", flexWrap:"wrap", justifyContent:"space-evenly"}}>
        <div style={{height:"100px", width:"100%"}}></div>
        {posts.map((el)=>{
            return(
                <div style={{width:"30%", height:"300px"}}>
                    <img style={{width:"100%", height:"70%"}} src={el.imgUrl} alt="image" />
                    <p>{el.title}</p>
                </div>
            )
        })}
    </div>
  )
}

export default Home