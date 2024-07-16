"use client"
import React, { useState } from 'react'
import { userLogin } from '~/databaseCall/userLogin'
import { useDispatch } from 'react-redux'
import { removeUserDetail, setUserDetail } from '~/store/userSlice'
import { useRouter } from 'next/router'

function login({ setKeepEmail, setsignup, setLogin, setVerifyOtp }) {

    const dispatch = useDispatch()
    const router = useRouter()

    const [password, showPassword] = useState(false)

    const [useremail, setUserEmail] = useState("")
    const [userpassword, setUserPassword] = useState("")

    const handleComponentRendering = () => {
        setsignup(true)
        setLogin(false)
        setVerifyOtp(false)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        userLogin(useremail, userpassword)
            .then((data) => {
                console.log("data received while login is: ", data);

                if (!data.verified) {
                    setsignup(false)
                    setLogin(false)
                    setVerifyOtp(true)
                }
                else {
                    dispatch(setUserDetail(data))
                    router.push("/homepage")
                }
            })
            .catch((error) => {

            })
    }

    return (
        <div className='flex flex-col gap-y-4 border-1 border-solid border-gray-300 py-4 px-8 rounded-xl'>
            <div className='text-center font-semibold text-2xl'>Login</div>
            <div>
                <div className='text-center font-medium text-xl'>Welcome back to ECOMMERCE</div>
                <div className='text-center text-sm'>The next gen business marketplace</div>
            </div>

            <form className='flex flex-col gap-y-5' onSubmit={handleLogin} >

                <div className='flex flex-col'>
                    <label htmlFor="useremail">Email</label>
                    <input onChange={(e) => {
                        setUserEmail(e.target.value)
                        setKeepEmail(e.target.value)
                    }} required className='border-1 border-solid border-gray-300 rounded-md px-2 py-1 focus:outline-none w-80' type="email" name="useremail" id="useremail" placeholder='Enter' />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="userpassword">Password</label>
                    <input onChange={(e) => setUserPassword(e.target.value)} minLength={2} required className='border-1 border-solid border-gray-300 rounded-md px-2 py-1 focus:outline-none' type={password ? "text" : "password"} name="userpassword" id="userpassword" placeholder='Enter' />
                    {
                        password ? <button onClick={() => showPassword(false)} className='underline relative bottom-7 left-32'>Hide</button> : <button onClick={() => showPassword(true)} className='underline relative bottom-7 left-32'>Show</button>
                    }
                </div>

                <button className='bg-black text-white rounded-md py-2' type="submit">Login</button>
            </form>

            <div className='mt-4 mb-16 text-center'>
                <span>Don't have an Account?</span>
                <button onClick={handleComponentRendering} className='ml-2 font-medium'>SIGN UP</button>
            </div>
        </div>
    )
}

export default login