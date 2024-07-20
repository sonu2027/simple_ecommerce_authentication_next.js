import React, { useEffect, useState } from 'react'
import Header from '~/_components/header'
import Offer from '~/_components/offer'
import { getProducts } from '~/databaseCall/getProducts'
import Products from '~/_components/products'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import type { RootState } from '~/store/store'

type Product = {
  id: number;
  name: string;
  createdAt: string;
}

function Homepage() {

  const [products, setProducts] = useState<Product[]>([]);
  const user = useSelector((s: RootState) => s.user.data)
  const router = useRouter()

  useEffect(() => {
    if (!user.verified) {
      void router.push("/")
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
  }, [router, user.verified])

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

export default Homepage