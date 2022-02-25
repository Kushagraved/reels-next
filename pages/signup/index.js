import React from 'react'
import TextField from '@mui/material/TextField';
//inbuilt next image tag (optimized)
import Image from 'next/image';
import Button from '@mui/material/Button';
import insta from './assets/insta.png'
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import { useEffect } from 'react';
import { storage } from '../../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from '../../firebase';
import { collection, doc, setDoc } from "firebase/firestore"; 
function index() {
    const router = useRouter()
    const [email, setEmail] =useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('');
    const [file, setFile] = useState('');

    const [error, setError] =useState('')
    //Disable button if loading
    const [loading, setLoading] = useState(false)

    const {signup,user} = useContext(AuthContext);

    //If User already logged in
    useEffect(()=>{
        
        if(user){
            router.push('/')
        }
        else{
            console.log("Not logged in");
        }
    },[user])

    // SIGNUP CLICK
    const handleClick = async() => {
        // console.log(email);
        // console.log(password);
        // console.log(name);
        // console.log(file);

        try{
            setLoading(true)
            setError('')
            const user=await signup(email, password)
            console.log("Signed Up!")
            
            //Location of Profile Pic
            const storageRef = ref(storage, `${user.uid}/Profile`);

            const uploadTask = uploadBytesResumable(storageRef, file);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed', 
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }, 
            (error) => {
                // Handle unsuccessful uploads
                console.log(error);
            }, 
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                    console.log('File available at', downloadURL);
                    let obj={
                        name:name,
                        email:email,
                        uid:user.user.uid,
                        photoUrl:downloadURL    
                    }
                    await setDoc(doc(db,"users",user.user.uid),obj);
                    console.log("doc added");
                });
            }
            );

        }catch(err){
            console.log(err)
            setError(err.message)
            setTimeout(()=>{
                setError('')
            },2000)
        }
        setLoading(false)
    }

    return (
        <div className='signup-container'>
            
            <div className='signup-card'>
                <Image src={insta}></Image>
                {/* Email */}
                <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth size='small' margin='dense' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                {/* Password */}
                <TextField id="outlined-basic" label="Password" type='password' variant="outlined" fullWidth size='small' margin='dense' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                {/* Full Name */}
                <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth size='small' margin='dense' value={name} onChange={(e)=>setName(e.target.value)}/>

                {/* File(Upload Profile pic) */}
                <Button variant="outlined" component="label" fullWidth style={{marginTop:'1rem'}} >
                    <input type='file' accept="image/*" style={{display:'none'}} onChange={(e)=>setFile(e.target.files[0])}></input>
                    Upload
                </Button>

                {/* Submit Button */}
                <Button variant="contained" component="span" fullWidth style={{marginTop:'1rem'}} onClick={handleClick} disabled={loading}>
                    Sign Up
                </Button>              
            </div>

            <div className='bottom-card'>
                Already Have an Account ? 
                    <span style={{color:'blue'}}><Link href='/login'> Login</Link> </span>
                
            </div>
            
        </div>
    )
}

export default index
