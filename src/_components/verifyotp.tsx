import React, { useEffect } from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { verifyOtpOfUser } from '~/databaseCall/verifyOtpOfUser';
import { useDispatch } from 'react-redux';
import { setUserDetail } from '../store/userSlice';
import { markedOtpVerified } from '~/databaseCall/markedOtpVerified';

function verifyOtp({ keepEmail, setsignup, setLogin, setVerifyOtp }) {

    const inputRef = useRef([])
    const router = useRouter()
    const dispatch = useDispatch()

    const [username, setUsername] = useState('');
    const [useremail, setUseremail] = useState('');
    const [userpassword, setUserpassword] = useState('')

    const [verificationSuccess, setVerificationSuccess] = useState(false)

    const [inputOtp, setInputOtp] = useState(Array.from({ length: 8 }, () => ''))

    useEffect(() => {
        if (verificationSuccess) {
            router.push("/homepage")
        }
    }, [verificationSuccess])

    const handleChange = (e, index) => {
        const value = e.target.value;
        setInputOtp(s => {
            const newState = [...s];
            newState[index] = e.target.value;
            return newState;
        });

        if (value.length === 1) {
            if (index < inputRef.current.length - 1) {
                inputRef.current[index + 1].focus();
            }
        } else {
            e.target.value = value.charAt(0);
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputRef.current[index - 1].focus();
        }
    };

    const handleVerifyEmail = async (e) => {
        e.preventDefault()
        verifyOtpOfUser(e, inputOtp, keepEmail)
            .then((data) => {
                console.log("data received after verifying user: ", data);
                return data.email
            })
            .then((email) => {
                markedOtpVerified(email)
                    .then((data) => {
                        setVerificationSuccess(true)
                        dispatch(setUserDetail(data))
                    })
            })
            .catch((error) => {

            })
    }

    return (
        <div className='flex flex-col gap-y-4 border-1 border-solid border-gray-300 py-4 px-8 rounded-xl'>
            <div className='text-center font-semibold text-2xl'>Verify Your email</div>
            <div>
                <div className='text-center text-sm'>Enter the 8 digit code you have received on</div>
                <div className='text-center text-sm font-semibold'>{keepEmail.slice(0, 3)}***{keepEmail.slice(keepEmail.length - 10, keepEmail.length)}</div>
            </div>

            <form onSubmit={handleVerifyEmail} className='flex flex-col gap-y-1 mt-4' >

                <label htmlFor="">Code</label>
                <div className="flex gap-x-2 justify-center items-center">
                    {
                        Array.from({ length: 8 }).map((_, i) => <input minLength={1} ref={(el) => (inputRef.current[i] = el)} onChange={(e) => handleChange(e, i)} key={i} onKeyDown={(e) => handleKeyDown(e, i)} className='border-1 border-solid border-gray-400 h-10 w-9 rounded-md focus:outline-none text-center' type="number" name="" id="" maxLength={1} />)
                    }
                </div>

                <button className='bg-black text-white rounded-md py-2 mt-10' type="submit">Verify</button>
            </form>
        </div>
    )
}

export default verifyOtp