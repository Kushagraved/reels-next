import React from 'react'
import TextField from '@mui/material/TextField';
//inbuilt nextJS Image tag (optimized)
import Image from 'next/image';
import Button from '@mui/material/Button';
import insta from '../signup/assets/insta.png'
import { Carousel } from 'react-responsive-carousel';

import bg1 from './assets/bg1.jpg'
import bg2 from './assets/bg2.jpg'
import bg3 from './assets/bg3.jpg'
import bg4 from './assets/bg4.jpg'
import bg5 from './assets/bg5.jpg'

import { AuthContext } from '../../context/auth';
import Alert from '@mui/material/Alert';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Link from 'next/link';
import { useState } from 'react';
function Index() {

    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] =useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const {login,user} = useContext(AuthContext);

    useEffect(()=>{
        if(user){
            // Programmatic Redirect
            router.push('/')
        }
        else{
            console.log("Not logged in");
        }
    },[user])


    const handleClick = async() => {
        try{
            setLoading(true)
            setError('')
            await login(email, password)
            console.log("Logged in!")
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
        <div className='login-container'>

            {/* Carousel */}
            <div className='carbg'>
                <div className='car'>
                <Carousel showArrows={false} showIndicators={false} showThumbs={false} showStatus={false} 
                infiniteLoop={true}
                interval={2000}
                autoPlay={true}>
                    <Image src={bg1}></Image>
                    <Image src={bg2}></Image>
                    <Image src={bg3}></Image>
                    <Image src={bg4}></Image>
                    <Image src={bg5}></Image>
                </Carousel>
                

                </div>
            </div>

            {/* Login Box*/}
            <div>
                <div className='login-card'>
                    <Image src={insta}></Image>
                    {/* Email */}
                    <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth size='small' margin='dense' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    {/* Password */}
                    <TextField id="outlined-basic" label="Password" type='password' variant="outlined" fullWidth size='small' margin='dense'value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    
                    {/* Error */}
                    {
                        error!='' && <Alert severity="error">{error}</Alert>
                    }

                    


                    {/* Login */}
                    <Button variant="contained" component="span" fullWidth style={{marginTop:'1rem'}} onClick={handleClick} disabled={loading}>
                        <input type='file' accept="image/*" style={{display:'none'}}></input>
                        Login
                    </Button>   
                
                    <div style={{color:'blue',marginTop:'0.5rem'}}>
                        <Link href='/forgotpassword'>Forgot Password?</Link>
                    </div>           
                </div>
                
                <div className='bottom-card'>
                    Don&apost Have an Account ? 
                        <span style={{color:'blue'}}><Link href='/signup'>Sign Up</Link></span>
                    
                </div>
            </div>
            
        </div>
    )
}

export default Index
