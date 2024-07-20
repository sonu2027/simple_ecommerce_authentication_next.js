import React from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function Offer() {
    return (
        <div className='flex justify-center items-center gap-x-4 py-1 bg-gray-100 text-xs'>
            <IoIosArrowBack />
            <p>Get 10% off on business signup</p>
            <IoIosArrowForward />
        </div>
    )
}

export default Offer