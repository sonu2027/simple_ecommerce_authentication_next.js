"use client"
import React, { useEffect } from 'react'
import { useState } from 'react';
import { userRegistartion } from '~/databaseCall/userRegistartion';

function signUp({ setKeepEmail, setsignup, setLogin, setVerifyOtp }) {

    const [username, setUsername] = useState('');
    const [useremail, setUseremail] = useState('');
    const [userpassword, setUserpassword] = useState('')

    const [signupSuccess, setSignupSuccess] = useState(false)

    const [data, setData] = useState({})

    useEffect(() => {
        if (signupSuccess) {
            setsignup(false)
            setLogin(false)
            setVerifyOtp(true)
        }
    }, [signupSuccess])

    const handleComponentRendering = () => {
        setsignup(false)
        setLogin(true)
        setVerifyOtp(false)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        userRegistartion(username, useremail, userpassword)
            .then(() => {
                setSignupSuccess(true)
            })
            .catch((error) => {
                console.log("Error userRegistartion: ", error);
                
            })
    }

    return (
        <div className='flex flex-col gap-y-4 border-1 border-solid border-gray-300 py-4 px-8 rounded-xl'>
            <div className='text-center font-semibold text-2xl'>Create your account</div>

            <form className='flex flex-col gap-y-5' onSubmit={handleSubmit} >
                <div className='flex flex-col'>
                    <label htmlFor="username">Name</label>
                    <input onChange={(e) => setUsername(e.target.value)} required className='border-1 border-solid border-gray-300 rounded-md px-2 py-1 w-80 focus:outline-none' type="text" name="username" id="username" placeholder='Enter' />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="useremail">Email</label>
                    <input onChange={(e) => {
                        setUseremail(e.target.value)
                        setKeepEmail(e.target.value)
                    }} required className='border-1 border-solid border-gray-300 rounded-md px-2 py-1 focus:outline-none' type="email" name="useremail" id="useremail" placeholder='Enter' />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="userpassword">Password</label>
                    <input minLength={8} onChange={(e) => setUserpassword(e.target.value)} required className='border-1 border-solid border-gray-300 rounded-md px-2 py-1 focus:outline-none' type="password" name="userpassword" id="userpassword" placeholder='Enter' />
                </div>

                <button className='bg-black text-white rounded-md py-2 mt-2' type="submit">Create Account</button>
            </form>

            <div className='mt-4 mb-16 text-center'>
                <span>Have an Account?</span>
                <button onClick={handleComponentRendering} className='ml-2 font-medium'>LOGIN</button>
            </div>
        </div>
    )
}

export default signUp