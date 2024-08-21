import { Alert, Button, TextInput } from 'flowbite-react'
import React, {useEffect, useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase.js'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



export default function DashProfile() {
  const {currentUser} = useSelector(state =>state.user)
  const [imageFile, setImageFile] = useState(null)
  const[imageFileUrl, setImageFileUrl] = useState(null)
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null)
  const [imageFileUploadError, setImageFileUploadError] = useState(null)
  const filePickerRef = useRef()
  
  const handleImageChange = (e) =>{
    const file = e.target.files[0]
    
    if(file){
      setImageFile(file)
      if (file.type.startsWith('image/') && file.size < 2*1024*1024) {

        setImageFileUrl(URL.createObjectURL(file))
      } else {
        setImageFileUrl(null)
      }
    }
  }
  useEffect(()=>{
    if(imageFile){
      uploadImage()
    }
  }, [imageFile])

  const uploadImage = async ()=>{
    // rules_version = '2';

    /* service firebase.storage {
      match /b/{bucket}/o {
        match /{allPaths=**} {
          allow read, write: if 
          request.resource.size  < 2 * 1024 * 1024 &&
          request.resource.contentType.matches('image/.*');
        }
      }
    } */
   setImageFileUploadError(null)
   const storage = getStorage(app)
   const fileName = new Date().getTime() + imageFile.name
   const storageRef = ref(storage, fileName)
   const uploadTask = uploadBytesResumable(storageRef, imageFile)
   uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      setImageFileUploadProgress(progress.toFixed(0))
    },
    (error)=>{
        setImageFileUploadError("Couldn't upload image file. An error occurred.(Files must be less than 2 MB)")
        setImageFileUrl(null)
        setImageFile(null)
        setImageFileUploadProgress(null)
    },
    () =>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        setImageFileUrl(downloadURL)
      })
    } 
   )
  }
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>
        

        <input type="file" accept='image/*' name="" id="" onChange={handleImageChange} ref={filePickerRef} hidden/>
     
        <div className=" relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"  onClick={()=>{
            filePickerRef.current.click()}}>
              {imageFileUploadProgress && <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`}
              strokeWidth={3}
              styles={{
                root:{
                  width:'100%',
                  height:'100%',
                  position: 'absolute',
                  top: 0,
                  left: 0
                },
                path:{
                  stroke: `rgba(62, 152,199, ${imageFileUploadProgress / 100})`
                }
              }} className={`${imageFileUploadProgress == 100 && 'opacity-0'} `}
              />}
          <img src={imageFileUrl || currentUser.profilePicture} alt="user" className={`${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'} rounded-full w-full h-full object-cover border-8 border-[lightgray]`} />

        </div>
        {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}
        
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
