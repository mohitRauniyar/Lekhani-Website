import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Alert, Button, Label, Spinner, TextInput} from 'flowbite-react'
import OAuth from '../components/OAuth'

export default function SignUp() {
  const [formData, setFormData] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]:e.target.value.trim() })
  }

  const handleSubmit= async (e) =>{
    e.preventDefault()
    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessage('Please fill out all fields.')
    }

    try {
      setLoading(true)
      setErrorMessage(null)


      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })
      const data = await res.json();
      if (data.success === false){
        setLoading(false)
        return setErrorMessage(data.message)
      }
      setLoading(false)
      if(res.ok){
        navigate('/signin')
      }
    } catch (error) {
      setErrorMessage(error.message)
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen mt-20'>
      <div className=" flex flex-col p-3 max-w-3xl mx-auto lg:flex-row lg:items-center gap-5 lg:gap-10">
        <div className=" flex-1">
        <Link to='/' className=' text-4xl font-bold dark:text-white mx-auto'>
            <span className='px-4 py-3 bg-indigo-950 text-white rounded-xl'>Lekhani</span>
            <span className=' font-semibold px-5'>X</span>
            <span className='px-4 py-3 bg-pink-600 text-white rounded-xl'>Amrita</span>
        </Link>
        <p className="text-sm mt-10">This is the official website for Lekhani - The Press Club powered by Amrita Vishwa Vidyapeethan, Bengalore Campus</p>
        </div>
        <div className="flex-1">
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your username'/>
              <TextInput type='text' placeholder='Username' id='username' onChange={handleChange}/> 
            </div>
            <div>
              <Label value='Your email'/>
              <TextInput type='email' placeholder='name@company.com' id='email' onChange={handleChange}/> 
            </div>
            <div>
              <Label value='Your password'/>
              <TextInput type='password' placeholder='Password' id='password' onChange={handleChange}/> 
            </div>
            <Button type='submit' className='bg-indigo-950' gradientDuoTone='purpleToPink' disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner className='sm'/>
                    <span className="pl-3">Loading...</span>
                  </>
                ) : "Sign Up"
              }
            </Button>
            <OAuth/>
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/signin' className='text-blue-500'>Sign In</Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>{errorMessage}</Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
