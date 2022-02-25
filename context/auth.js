import React from 'react'
import { auth } from '../firebase';
import { useState } from 'react';
import { useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signOut } from 'firebase/auth';

export const AuthContext=React.createContext();

function AuthWrapper({children}) {
   
    const [user, setUser] = useState(null);
    //in begining loading is true
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        //Event listener
        //Get the currently signed-in user
        onAuthStateChanged(auth, (user) => {
            console.log(user)
            if(user){
                setUser(user)
            }else{
                setUser('')
            }
        })
        setLoading(false);
    },[])

    function login(email,password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout(){
        return signOut(auth);
    }

    function forgot(email){
        return sendPasswordResetEmail(auth, email)
    }

    function signup(email,password){
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const store = {
        login,
        user,
        logout,
        forgot,
        signup
    } 
    return (
        <AuthContext.Provider value={store}>
            {/* when loading false =>show all components */}
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthWrapper
