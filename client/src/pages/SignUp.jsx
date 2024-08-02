import React from 'react'
import { Link } from 'react-router-dom'
import {Button, Label, TextInput} from 'flowbite-react'

export default function SignUp() {
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
          <form className='flex flex-col gap-4'>
            <div>
              <Label value='Your username'/>
              <TextInput type='text' placeholder='Username' id='username'/> 
            </div>
            <div>
              <Label value='Your email'/>
              <TextInput type='text' placeholder='name@company.com' id='email'/> 
            </div>
            <div>
              <Label value='Your password'/>
              <TextInput type='text' placeholder='Password' id='password'/> 
            </div>
            <Button type='submit' className='bg-indigo-950' gradientDuoTone='purpleToPink'>Sign Up</Button>
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account</span>
            <Link to='/signin' className='text-blue-500'>Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
