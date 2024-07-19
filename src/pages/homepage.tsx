import React, { useEffect, useState } from 'react'
import Header from '~/_components/header'
import Offer from '~/_components/offer'
import { getProducts } from '~/databaseCall/getProducts'
import Products from '~/_components/products'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

function homepage() {

  const [products, setProducts] = useState([])
  const user = useSelector((s) => s.user.data)
  const router = useRouter()

  useEffect(() => {
    if (!user.id) {
      router.push("/")
    }
    else {
      getProducts()
        .then((product) => {
          setProducts(product)
        })
        .catch((error) => {
          console.error("Error getProducts: ", error);
        })
    }
  }, [])

  return (
    <div>
      {
        user.id &&
        <>
          <Header />
          <Offer />
          <div className='flex justify-center items-center mt-7'>
            <Products products={products} />
          </div>
        </>
      }
    </div>
  )
}

export default homepage