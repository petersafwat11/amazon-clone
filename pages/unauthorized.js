import React from 'react'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import Link from 'next/link'
const unauthorized = () => {
    const router =useRouter();
    const {message}= router.query; 
  return (
    <Layout>
        <h1>access denied </h1>
        {message&& <div className='text-red-500'><Link href='/login'>{message}</Link> </div>}
    </Layout>
  )
}

export default unauthorized
