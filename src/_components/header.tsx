import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";

function header() {
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
                    <li className="hover:cursor-pointer">Hi, John</li>
                </ul>
                <div className="flex mt-4 justify-end gap-x-6">
                    <IoIosSearch className="hover:cursor-pointer text-xl" />
                    <FiShoppingCart className="hover:cursor-pointer text-xl" />
                </div>
            </div>
        </header>
    )
}

export default header