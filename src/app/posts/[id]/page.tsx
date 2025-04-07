"use client"

import React from 'react'
import {useState, useEffect} from 'react'

type PostType = {
    userId: number,
    id: number,
    title: string,
    body: string
  }

  // I need to change here to use useParams hook since its client, not server
const Post = ({params} :{params : {id: string}}) => {

    const [post, setPost] = useState<PostType | null>(null)

    useEffect(() => {

        const getPost = async () => {
            console.log(params.id)
            const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
            const dataPost = await post.json()
            console.log(dataPost)
            setPost(dataPost)
        }
        getPost()

    },[params.id])

  return (
    <>
    <div>Here is a detailed information on your post:</div>
    <div>
        {post ? 
        
        <div className=' text-black flex flex-col justify-center items-center h-screen'>
            <h1>Post Id: {post.id}</h1>
            <h2>User Id: {post.userId}</h2>
            <h1>Title: {post.title} </h1>
            <p>Description: {post.body}</p>
            
        </div> 
        
        :
        
        <h1>No Post</h1>}

    </div>
    </>
  )
}

export default Post