import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Alert, Button, Label, Spinner, TextInput} from 'flowbite-react'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart,signInSuccess, signInFailure } from '../redux/user/userSlice'

export default function SignIn() {
  const [formData, setFormData] = useState({})
  const {loading, error: errorMessage} = useSelector(state => state.user)


  const dispatch = useDispatch()

  const navigate = useNavigate()
  
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]:e.target.value.trim() })
  }

  const handleSubmit= async (e) =>{
    e.preventDefault()
    if(!formData.email || !formData.password){
      return dispatch(signInFailure('Please fill out all fields.'))
    }

    try {
      dispatch(signInStart())

      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })
      const data = await res.json();
      if (data.success === false){
        dispatch(signInFailure(data.message))
      }
      if(res.ok){
        dispatch(signInSuccess(data))
        navigate('/')
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
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
                ) : "Sign In"
              }
            </Button>
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to='/signup' className='text-blue-500'>Sign Up</Link>
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
