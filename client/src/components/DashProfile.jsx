import { Button, TextInput } from 'flowbite-react'
import React, {useRef, useState} from 'react'
import {useSelector} from 'react-redux'
export default function DashProfile() {
  const {currentUser} = useSelector(state =>state.user)
  const [imageFile, setImageFile] = useState(null)
  const[imageFileUrl, setImageFileUrl] = useState(null)
  const filePickerRef = useRef()
  const handleImageChange = (e) =>{
    const file = e.target.files[0]
    if(file){
      setImageFile(file)
      setImageFileUrl(URL.createObjectURL(file))
    }
  }
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>
        

        <input type="file" accept='image/*' name="" id="" onChange={handleImageChange} ref={filePickerRef} hidden/>
     
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img src={imageFileUrl || currentUser.profilePicture} alt="user" className='rounded-full w-full h-full object-cover border-8 border-[lightgray]' onClick={()=>{
            filePickerRef.current.click()
          }} />

        </div>
        <TextInput type='text' id='username' placehplder='username' defaultValue={currentUser.username}/>
        <TextInput type='email' id='email' placehplder='email' defaultValue={currentUser.email}/>
        <TextInput type='password' id='password' placehplder='password' />
        <Button type='submit' gradientDuoTone='purpleToPink' outline>Update</Button>
      </form>
      <div className="text-red-500 flex justify-between my-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  )
}
