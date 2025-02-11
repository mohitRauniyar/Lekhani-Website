import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {Table} from 'flowbite-react'
import { Link } from 'react-router-dom'

export default function DashPosts() {
  const {currentUser} = useSelector((state) => state.user)
  const [userPosts, setUserPosts] = useState([])
  // console.log(userPosts)
  useEffect(()=>{
    const fetchPosts = async ()=>{
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
        const data = await res.json()
        if(res.ok){
          setUserPosts(data.posts)
        }
      } catch (error) {
        console.log(error)
      }
    }
    if(currentUser.isAdmin){
      fetchPosts()
    }
  }, [currentUser._id])
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {
        currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post)=>(
              <Table.Body className='divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`}>
                        <img src={post.image} alt={post.title} className='w-20 h-20 object-cover bg-gray-500' />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`} className='font-medium dark:text-white text-gray-900'>
                        {post.title}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      {post.category}
                    </Table.Cell>
                    <Table.Cell>
                      <span className='text-red-500 hover:underline cursor-pointer font-medium'>Delete</span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link className='font-medium text-teal-500 hover:underline' to={`/update-post/${post._id}`}>
                        <span>Edit</span>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <p>You do not have any posts yet.</p>
      )
      }
    </div>
  )
}
