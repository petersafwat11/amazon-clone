import React, { useState } from 'react'
import Head from 'next/dist/shared/lib/head'
import {AiOutlineMenu} from 'react-icons/ai'
import {BsSearch} from 'react-icons/bs'
import Link from 'next/link'
import { ToastContainer } from 'react-toastify'
import HeaderCartButton from './HeaderCartButton'
import {useSession,signOut} from 'next-auth/react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import 'react-toastify/dist/ReactToastify.css';
const Layout = ({title, children}) => {
  const {data: session, status}= useSession();
  const router = useRouter();
  const[clicked,setClicked]= useState(false)
  const logoutHandeler=()=>{
    signOut('credentials', {callbackUrl: '/login'});
    Cookies.remove('cart');
    Cookies.remove('shipping')

  }
  const clickHandeler=()=>{
    setClicked(!clicked)
  }
  return (
    <>
      <Head>
        <title>{title? title + '- Amazone' : 'Amazone'}</title>
        <meta name="description" content="E-commerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <ToastContainer limit={1} position='bottom-center' />
      <div className='flex flex-col min-h-screen relative items-center'>
        <header className='h-16 w-full bg-gray-700 flex justify-between items-center text-white px-6' >
            <div className='space-x-4 flex items-center justify-center '>
                <AiOutlineMenu size={20} />
                <Link href='/' >
                   <h1 className='text-lg font-black hidden sm:block cursor-pointer ' onClick={()=>{router.push('/')}}>Amazone</h1>
                </Link>
            </div>
            <div className=' flex relative '>
              <input type='text' className='rounded-lg shadow w-40 md:w-60 p-2 ' placeholder='Search Products' />
              <span className='bg-yellow-300 w-[18%] hover:bg-gray-100 duration-200 ease-out cursor-pointer absolute top-0 right-0 h-full pl-1 pt-2 md:pl-3 rounded-tr-lg rounded-br-lg '>
                 <BsSearch size={20} className='text-gray-700 ' />
              </span>
            </div>
            <div className='flex items-center justify-center space-x-4'>
              <HeaderCartButton/>
              {
                status==='loading'?
                'loading'
               : session?.user?
               <div className='relatvie'>
                <div onClick={clickHandeler}>
                 <Link href='/'>
                {session.user.name}
              </Link>
                  </div>
                </div>
              :
              <Link href='/login'>
                Login
              </Link> 
              }

            </div>
                {clicked&&
              <div className=' p-2 bg-gray-50 absolute top-14 right-3 flex justify-between flex-col w-30  text-gray-500' >
                <button className='text-lg font-semibold px-6 py-3 hover:bg-slate-300' onClick={()=>{router.push('/profile')}}>Profile</button>
                <button className=' text-lg font-semibold px-6 py-3 hover:bg-slate-300' onClick={()=>{router.push('/order-history')}}>Order History </button>
                <button className='text-lg font-semibold px-6 py-3 hover:bg-slate-300' onClick={logoutHandeler}>Logout</button>
                </div>}
        </header>
        <main className='container mx-auto px-4 mt-4 mb-12' >
            {children}
        </main>
        <footer className='flex justify-center items-center shadow-inner absolute bottom-0 h-12 text-lg'>
            All rights reserved. Peter Safwat.
        </footer>
      </div>
    </>
  )
}

export default Layout
