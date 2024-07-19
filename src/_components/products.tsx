import React, { useEffect, useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { createMarkProduct } from '~/databaseCall/createMarkProduct';
import { useSelector } from 'react-redux';
import { getMarkProduct } from '~/databaseCall/getMarkProduct';
import { deleteMarkedProduct } from '~/databaseCall/deleteMarkedProduct';

function products({ products }) {

    let user = useSelector((s) => s.user.data)

    const [renderProducts, setRenderProducts] = useState([])
    const [page, setPage] = useState(0)
    const [pageLimit, setPageLimit] = useState(6) // If  you want show other than 6 products in a page you can just change the value 6 to your desired value and everything will handle automatically in code
    const [totalPage, setTotalPage] = useState(0)
    const [markedProducts, setMarkedProducts] = useState([])
    const [productChecked, setProductChecked] = useState(false)

    useEffect(() => {
        getMarkProduct(user.id)
            .then((data) => {
                setMarkedProducts(data.map((e) => {
                    return Number(e.productId)
                }))
            })
            .catch((error) => {
                console.error("Error getMarkProduct: ", error);
            })
    }, [productChecked])

    useEffect(() => {
        const pages = Math.floor(products.length / pageLimit)
        setTotalPage(pages)
        setRenderProducts(products.filter((e, i) => i < pageLimit))
    }, [products])

    const handleNext = (add) => {
        setPage(page + add)
        if (page == totalPage - 1) {
            setRenderProducts(products.filter((e, i) => i >= pageLimit * (page + add)))
        }
        else {
            setRenderProducts(products.filter((e, i) => i >= pageLimit * (page + add) && i < pageLimit * (page + add + 1)))
        }
    }

    const handlePrev = (sub) => {
        setPage(page - sub)
        setRenderProducts(products.filter((e, i) => i >= pageLimit * (page - sub) && i < pageLimit * (page - sub + 1)))
    }

    const markedProduct = (e) => {

        if (e.target.checked) {
            createMarkProduct(user.id, e.target.id) // e.target.checked is productId
                .then((data) => {
                    setProductChecked(!productChecked)
                })
                .catch((error) => {
                    console.error("Error createMarkProduct: ", error);
                })
        }
        else {

            deleteMarkedProduct(user.id, e.target.id) // e.target.checked is productId
                .then(() => {
                    setProductChecked(!productChecked)
                })
                .catch((error) => {
                    console.error("Error deleteMarkedProduct: ", error);
                })
        }
    }

    return (
        <div className='flex flex-col gap-y-4 border-1 border-solid border-gray-300 py-4 px-8 rounded-xl'>
            <div className='text-center font-semibold text-2xl mt-1'>Please mark your interests!</div>

            <div className='text-center text-sm'>We will keep you notified.</div>

            <form className='flex flex-col gap-y-4' >
                <label className='font-medium text-lg' htmlFor="">My saved interests!</label>
                {
                    renderProducts.map((e) => <div key={e.id} className='flex justify-start items-center gap-x-3'>
                        <input checked={markedProducts.includes(e.id)} onChange={markedProduct} type="checkbox" name="" id={e.id} />
                        <label htmlFor={e.id}>{e.name}</label>
                    </div>)
                }
            </form>

            <div className='mt-4 mb-6 text-center flex justify-start items-center gap-x-1'>
                <button disabled={page === 0} onClick={() => handlePrev(page)} className='flex mr-2 text-gray-400'><IoIosArrowBack /><IoIosArrowBack /></button>


                <div className='flex gap-x-3'>

                    <button disabled={page === 0} onClick={() => handlePrev(1)} className='text-gray-400'><IoIosArrowBack /></button>

                    {
                        page > 2 && <button className='text-gray-400' onClick={() => handlePrev(3)} >{page - 2}</button>
                    }
                    {
                        page > 1 && <button className='text-gray-400' onClick={() => handlePrev(2)} >{page - 1}</button>
                    }
                    {
                        page > 0 && <button className='text-gray-400' onClick={() => handlePrev(1)} >{page}</button>
                    }
                    <button className='font-semibold text-lg'>{page + 1}</button>
                    {
                        page < totalPage && <button className='text-gray-400' onClick={() => handleNext(1)}>{page + 2}</button>
                    }
                    {
                        page < totalPage - 1 && <button className='text-gray-400' onClick={() => handleNext(2)}>{page + 3}</button>
                    }
                    {
                        page < totalPage - 2 && <button className='text-gray-400' onClick={() => handleNext(3)}>{page + 4}</button>
                    }
                </div>

                <div className='relative top-1 text-gray-400'>&bull;&bull;&bull;</div>
                <button className='text-gray-400' disabled={page === totalPage} onClick={() => handleNext(1)} ><IoIosArrowForward /></button>
                <button className='ml-2 flex text-gray-400' disabled={page === totalPage} onClick={() => handleNext(totalPage - page)} ><IoIosArrowForward /><IoIosArrowForward /></button>
            </div>
        </div>
    )
}

export default products