import React from 'react'
import Navbar from './Navbar'


function ProfileComp() {
    return (
        <div>
            <Navbar></Navbar>
            <div>
                <div className='profile_upper'>
                    <img src='https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' style={{height:'8rem',width:'8rem',borderRadius:"50%"}}></img>

                    <div style={{flexBasis:"40%"}}> 
                        <h1>Name</h1>
                        <h3>Posts: 10</h3>
                    </div>
                </div>

                <hr/>
                <div className='profile_videos'>
                    <video>

                    </video>
                </div>
            </div>
        </div>
    )
}

export default ProfileComp
