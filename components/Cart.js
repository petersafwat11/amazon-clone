import React from 'react'
import Ctx from '../store/CartCtx'
import { useContext } from 'react'
import Layout from './Layout'
import {AiOutlineClose} from 'react-icons/ai'
import data from '../utils/data'
import Link from 'next/link'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
const Cart = () => {
    const updateCartHandeler = (e ,item)=>{
        context.updateItem(e, item)
    }
    const context =useContext(Ctx);
      let x=0; 
  if (context.items.length>0 ){const num = context.items.map(item=>(
    x = x+item.amount
  ));}
  const router = useRouter()
  return (
    <Layout>
        <div className='px-6 py-2'>
        <p className='text-xl pb-2 font-semibold ' >Shopping Cart</p>
        <div className='grid lg:grid-cols-4 '>
            <table className='lg:col-span-3 text-center '>
                <thead className='border-b '>
                    <tr className='space-x-5 py-2 text-xl' >
                    <td className='pb-3'>Image </td>
                    <td className='pb-3'>Name</td>
                    <td className='pb-3'>Amout</td>
                    <td className='pb-3'>Price</td>
                    <td className='pb-3'>Action</td>
                    </tr>
                </thead>
                <tbody>
                    { (context.items&& context.items.length>0)&& context.items.map((item)=>(
                        <tr key={item.slug}>
                             <td><Link href={`/product/${item.slug}`} >
                                <img className='w-12 mx-auto rounded cursor-pointer' src={item.image} alt={item.name}/>
                                </Link> 
                             </td>
                            <td className='text-yellow-300'><Link href={`/product/${item.slug}`} >
                                {item.name}
                                </Link> </td>
                            <td>
                              <select defaultValue={item.amount} onChange={(e)=>{ updateCartHandeler(e.target.value, item)}} >

                                 {
                                [...Array(data.products.find(x=>(x.slug===item.slug)).countInStock).keys()].map(i=>(
                                    <option key={i+1} value={i+1} > {i+1}</option>
                                    ))
                                 }
                              </select>

                            </td>
                            <td>{item.price} </td>
                            <td><button onClick={()=>{context.removeItem(item) } } className='bg-blue-700 text-white py-3 px-6 rounded-md' ><AiOutlineClose/> </button> </td>
                        </tr>
                    )) }
                </tbody>
            </table>
            <div className='h-40 shadow rounded-lg flex flex-col p-4 justify-between font-semibold text-lg' >
                <p> Subtotal ({Number(x) } items) : $ {context.totalAmount }</p>
                <button className='primary-button' onClick={()=>{router.push('login?redirect=/shipping')}} >CHECKOUT</button>
            </div>
        </div>

        </div>
    </Layout>
  )
}

export default dynamic(()=> Promise.resolve(Cart), {ssr:false})
