"use client"

import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Link from 'next/link'

type DataDetails = {
    userId: number,
    id: number,
    title: string,
    body: string,
}



const Posts = () => {

const [data, setData] = useState<DataDetails[]>([])
const [filteredData, setFilteredData] = useState<DataDetails[]>([])
const [currentPage, setCurentPage] = useState(1)
const [loading, setLoading] = useState(true)
const [searchTerm, setSearchTerm] = useState('');


const isSearching = searchTerm.trim().length > 0;
const newData = isSearching ? filteredData : data
const postsPerPage = 10
const startIndex = (currentPage - 1) * postsPerPage;
const endIndex = startIndex + postsPerPage;
const totalPages = Math.ceil(newData.length / postsPerPage);
const paginatedData = newData.slice(startIndex, endIndex);


useEffect(() => {

  const fetchData = async () => {
    try {
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts')
    if (!posts.ok) {
      console.log("Error on fetch side")
    }
    const dataPosts = await posts.json()
    setData(dataPosts)
    console.log(dataPosts)
  } catch(err) {
    console.log("Error Occured", err)
  } finally {
    setLoading(false)
  }

  }

  fetchData()
}, [])

const searchPost = (val: string) => {
  setSearchTerm(val);
  setCurentPage(1)
  if (val.trim() === "") {
    setFilteredData([])
  } else {
    const filtered = data.filter((post) => post.title.toLowerCase().includes(val.toLowerCase()))
    setFilteredData(filtered)
  }
}


  return (
    <div>
      {loading ? "Loading..." 
      :
      data ? 
      <>
      <div className='flex flex-col justify-center items-center m-4 text-2xl'>
        <h1 className='flex text-center'>List of Posts</h1>
        <div>
          <input 
          type='search' 
          onChange={(event) => searchPost(event.target.value)} 
          className='bg-amber-950 text-white'
          placeholder='Search data...'/>
        </div>
      </div>  

      <ul className='flex flex-col gap-4 w-1/2 mx-auto'>
      {paginatedData.length ? 
        paginatedData.map((post) => (
          <li key={post.id} className='flex flex-col border-2 bg-amber-400 text-white font-extrabold'>
            <h1>Title: {post.title}</h1>
            <p>Description: {post.body}</p>

          <div className='flex justify-end text-emerald-600 mr-3'>
            <Link href={`/posts/${post.id}`}>
            <button className='cursor-pointer'>Details</button>
            </Link>

          </div>
          </li>
      )) :
        <div>Nothing was found</div>
      }
      </ul>
      {newData.length > 0 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i}
        onClick={() => {
          setCurentPage(i + 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`px-3 py-1 rounded ${
          currentPage === i + 1
            ? 'bg-amber-600 text-white'
            : 'bg-white text-black border'
        }`}
      >
        {i + 1}
      </button>
      ))}
      </div>
)}
      </>

      :
      <h1>No Data</h1>
      
      }
    </div>
  )
}

export default Posts