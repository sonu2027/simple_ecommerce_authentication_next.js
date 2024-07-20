import React, { useEffect } from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { verifyOtpOfUser } from '~/databaseCall/verifyOtpOfUser';
import { useDispatch } from 'react-redux';
import { setUserDetail } from '../store/userSlice';
import { markedOtpVerified } from '~/databaseCall/markedOtpVerified';
import { sendEmailVerification } from '~/databaseCall/sendEmailVerification';

type verifyOtpProps = {
    keepEmail: string
}

const VerifyOtp: React.FC<verifyOtpProps> = ({ keepEmail }) => {

    const inputRef = useRef<(HTMLInputElement | null)[]>(Array(8).fill(null) as (HTMLInputElement | null)[]);
    const router = useRouter()
    const dispatch = useDispatch()

    const [verificationSuccess, setVerificationSuccess] = useState<boolean>(false)

    const [inputOtp, setInputOtp] = useState<string[]>(Array.from({ length: 8 }, () => ''));

    useEffect(() => {
        if (verificationSuccess) {
            router.push("/homepage")
        }
    }, [verificationSuccess])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        setInputOtp(prevState => {
            const newState = [...prevState];
            newState[index] = value;
            return newState;
        });

        if (value.length === 1) {
            inputRef.current[index + 1]?.focus();
        } else if (value.length === 0 && index > 0) {
            inputRef.current[index - 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !inputOtp[index] && index > 0) {
            const previousInput = inputRef.current[index - 1];
            if (previousInput) {
                previousInput.focus();
            }
        }
        console.log(e);

    };


    useEffect(() => {
        if (keepEmail.includes("@gmail.com")) {
            sendEmailVerification(keepEmail)
                .then((res) => {
                    console.log("sending email otp successfully: ", res);
                })
                .catch((error) => {
                    console.error("sending email otp failed: ", error);
                })
        }
    }, [])

    const handleVerifyEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (inputOtp.some(digit => digit === '')) {
            return;
        }

        verifyOtpOfUser(e, inputOtp, keepEmail)
            .then((data) => {
                return data.email
            })
            .then((email) => {
                markedOtpVerified(email)
                    .then((data) => {
                        setVerificationSuccess(true)
                        dispatch(setUserDetail(data))
                    })
                    .catch((error) => {
                        console.log("error: ", error);
                    })
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    }

    return (
        <div className='flex flex-col gap-y-4 border-1 border-solid border-gray-300 pt-6 pb-11 px-8 rounded-xl'>
            <div className='text-center font-semibold text:xl sm:text-2xl'>Verify Your email</div>
            <div>
                <div className='text-center text-sm'>Enter the 8 digit code you have received on</div>
                <div className='text-center text-sm font-semibold'>{keepEmail.slice(0, 3)}***{keepEmail.slice(keepEmail.length - 10, keepEmail.length)}</div>
            </div>

            <form onSubmit={handleVerifyEmail} className='flex flex-col gap-y-1 mt-4'>
                <label htmlFor="">Code</label>
                <div className="flex gap-x-2 justify-center items-center">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <input
                            key={i}
                            ref={(el: HTMLInputElement | null) => { if (el) inputRef.current[i] = el; }}
                            onChange={(e) => handleChange(e, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            className='border-1 border-solid border-gray-400 h-10 w-9 rounded-md focus:outline-none text-center'
                            type="number"
                            maxLength={1}
                            value={inputOtp[i] && inputOtp[i].length > 1 ? inputOtp[i][0]:inputOtp[i]}
                        />

                    ))}
                </div>
                <button className='bg-black text-white rounded-md py-2 mt-10' type="submit">Verify</button>
            </form>

        </div>
    )
}

export default VerifyOtp