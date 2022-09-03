import React, { useContext, useEffect, useRef, useState } from 'react'
import Head from 'next/dist/shared/lib/head'
import {AiOutlineMenu} from 'react-icons/ai'
import {BsSearch} from 'react-icons/bs'
import Link from 'next/link'
import { ToastContainer } from 'react-toastify'
import HeaderCartButton from './HeaderCartButton'
import {useSession,signOut} from 'next-auth/react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import {AiOutlineClose} from 'react-icons/ai'
import 'react-toastify/dist/ReactToastify.css';
import { ColorLensOutlined } from '@mui/icons-material'
import axios from 'axios'
import Ctx from '../store/CartCtx'
const Layout = ({title, children}) => {
  const context = useContext(Ctx);
  const {setSearchItems}=context;
  const {data: session, status}= useSession();
  const router = useRouter();
  const[clicked,setClicked]= useState(false);
    const [nav, setNav] = useState(false);
    const [cat,setCat] = useState('');
    const searchRef= useRef(''); 
    const catRef= useRef(''); 
  const navHandeler = ()=>{
    setNav(!nav);
  }
  const logoutHandeler=()=>{
    signOut('credentials', {callbackUrl: '/login'});
    Cookies.remove('cart');
    Cookies.remove('shipping')

  }
  const clickHandeler=()=>{
    setClicked(!clicked)
  }
  const searchHandeler= (val)=>{
  //     if(router.route === '/search/[id]'){
  // console.log(router.route);
  // }
     const vals= val.split(' ');
     const newVal= vals.map(input=>(
      input= input.charAt(0).toUpperCase() + input.slice(1)));
      let valueCapitalized = newVal.toString().replace(',' , ' ');
    const data = axios.post(`/api/search`,{
      value:valueCapitalized,
    }).then(result=>{
      console.log(result)
      setSearchItems(result.data);
      router.push(`/search/${valueCapitalized}`)
    }).catch(err=>{
      console.log(err)
    })
  }
     const enterKeyPressed=(e)=>{
      if (e.key === 'Enter') {
        searchHandeler(searchRef.current.value)
      } 
   }
   const catHandeler = (val)=>{
    searchHandeler(val)
   }
  return (
    <>
      <Head>
        <title>{title? title + '- Amazone' : 'Amazone'}</title>
        <meta name="description" content="E-commerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <ToastContainer limit={1} position='bottom-center' />
      <div className='flex flex-col min-h-screen relative items-center '>
              <div className= {nav?'ease-out duration-200 absolute z-10 w-[70%] sm:w-[50%] h-[100%] top-0 left-0 md:w-[20%] bg-gray-300':'absolute z-10 h-[100%] top-0 md:left-[-20%] sm:left-[-50%] left-[-70%] w-[70%] sm:w-[50%] md:w-[20%] bg-gray-300 ease-out duration-500' }>
                <div className='mt-8 mx-auto w-[80%] flex flex-col'>
                  <div className='flex items-center justify-between'>
                    <p>Shopping By Categories</p>
                    <div className='mt-1 p-1 rounded-full bg-gray-400 cursor-pointer' onClick={navHandeler}>
                    <AiOutlineClose/>
                    </div>
                  </div>
                  <div>
                      <div onClick={()=>{catHandeler('Shirts')}} className='my-3 text-blue-400 hover:text-blue-600 ease-in duration-100 cursor-pointer hover:text-lg' >Shirts</div>
                      <div onClick={()=>{catHandeler('Pants')}} className='my-3 text-blue-400 hover:text-blue-600 ease-in duration-100 cursor-pointer hover:text-lg' >Pants</div>
                  </div>                  
                </div>
            </div>
        <header className='h-16 w-full bg-gray-700 flex justify-between items-center text-white px-6' >
            <div className='space-x-4 flex items-center justify-center '>
                <AiOutlineMenu size={20} onClick={navHandeler} className='cursor-pointer' />
                <Link href='/' >
                   <h1 className='text-lg font-black hidden sm:block cursor-pointer ' onClick={()=>{router.push('/')}}>Amazone</h1>
                </Link>
            </div>
            <div className=' flex relative '>
              <input type='text' className='rounded-lg text-gray-600 focus-visible:outline-none shadow w-22 sm-w-20 md:w-60 p-1 md:p-2 ' ref={searchRef} onKeyDown={(e)=>{enterKeyPressed(e)}}  placeholder='Search Products '/>
              <span onClick={(e)=>{searchHandeler(searchRef.current.value)}} className='bg-yellow-300 w-[18%] hover:bg-gray-100 duration-200 ease-out cursor-pointer absolute top-0 right-0 h-full pl-1 pt-2 md:pl-3 rounded-tr-lg rounded-br-lg '>
                 <BsSearch size={20} className='text-gray-700 ' />
              </span>
            </div>
            <div className='flex items-center justify-center md:space-x-4'>
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
