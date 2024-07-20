import Head from "next/head";
import React, { useState } from 'react'
import Header from "../_components/header"
import Offer from "../_components/offer"
import SignUp from "../_components/signUp"
import Login from "../_components/login"
import VerifyOtp from "~/_components/verifyotp";

const Home: React.FC = () => {

  const [signup, setsignup] = useState<boolean>(true)
  const [login, setLogin] = useState<boolean>(false)
  const [verifyOtp, setVerifyOtp] = useState<boolean>(false)

  const [keepEmail, setKeepEmail] = useState<string>("")

  return (
    <>
      <Head>
        <title>Simple ecommerce authentication app</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='m-0 p-0 h-screen'>
        <Header />
        <Offer />
        <div className='flex justify-center items-center mt-7'>
          {
            signup && <SignUp setKeepEmail={setKeepEmail} setsignup={setsignup} setLogin={setLogin} setVerifyOtp={setVerifyOtp} />
          }
          {
            login && <Login setKeepEmail={setKeepEmail} setsignup={setsignup} setLogin={setLogin} setVerifyOtp={setVerifyOtp} />
          }
          {
            verifyOtp && <VerifyOtp keepEmail={keepEmail}/>
          }
        </div>
      </div>
    </>
  );
}

export default Home