import { useRouter } from 'next/router'
import React from 'react'
import ProfileComp from '../components/ProfileComp'
import { useContext } from 'react'
import { AuthContext } from '../context/auth'

function Profile() {
    const {user} = useContext(AuthContext)

    const Redirect=()=>{
      const router =useRouter();
      router.push('./login')
      return null;
    }

    return (
        // Protected Route
        <div>
            {
                user?.uid ? <ProfileComp></ProfileComp> :<Redirect></Redirect>
            }
        </div>
    )
}

export default Profile
