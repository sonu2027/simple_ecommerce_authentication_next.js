import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { removeUserDetail } from '~/store/userSlice';

function header() {

    const router=useRouter()
    const dispatch=useDispatch()

    const [showLogout, setShowLogout] = useState(false)

    const user = useSelector((s) => s.user.data)

    window.addEventListener("click", () => {
        if (showLogout) {
            setShowLogout(false)
        }
    })

    const handleLogout=()=>{
        dispatch(removeUserDetail())
        router.push("/")
    }

    return (
        <header className='flex justify-between px-8 pb-3 bg-white'>
            <div className='pt-6 text-3xl font-bold'>Ecommerce</div>
            <ul className='flex font-medium gap-x-4 pt-6'>
                <li className="hover:cursor-pointer">Categories</li>
                <li className="hover:cursor-pointer">Sale</li>
                <li className="hover:cursor-pointer">Clearance</li>
                <li className="hover:cursor-pointer">New stock</li>
                <li className="hover:cursor-pointer">Tending</li>
            </ul>
            <div>
                <ul className='flex text-xs gap-x-4 pt-2'>
                    <li className="hover:cursor-pointer">Help</li>
                    <li className="hover:cursor-pointer">Orders & Returns</li>
                    <li className="hover:cursor-pointer">Hi, {user.id?user.name.split(" ")[0]:"John"}</li>
                </ul>
                <div className="flex mt-4 justify-end gap-x-6">
                    <IoIosSearch className="hover:cursor-pointer text-xl" />
                    <FiShoppingCart className="hover:cursor-pointer text-xl" />
                </div>
            </div>
            {
                showLogout ? <IoMdArrowDropdown onClick={(e) => {
                    e.stopPropagation()
                    setShowLogout(false)
                }} className='absolute right-4 top-2' /> : <IoMdArrowDropup onClick={(e) => {
                    e.stopPropagation()
                    setShowLogout(true)
                }} className='absolute right-4 top-2' />
            }
            {
                showLogout && <div onClick={(e) => e.stopPropagation()} className='absolute right-4 top-8 p-1 h-32 bg-gray-300 rounded-md z-10'>
                    <button onClick={handleLogout} className=' text-black px-8 py-1 border-1 border-solid border-gray-400 bg-white rounded-md'>Logout</button>
                </div>
            }
        </header>
    )
}

export default header