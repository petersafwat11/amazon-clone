import axios from 'axios'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import CheckoutWizard from '../components/CheckoutWizard'
import Layout from '../components/Layout'
import Ctx from '../store/CartCtx'
import { getError } from '../utils/error'
import  {toast}  from 'react-toastify'
const PlaceorderScreen = () => {
    const [loading, setLoading]= useState(false)
    const [dataLoading, setDataLoading]= useState(true);
    const context = useContext(Ctx);
    const {shippingDetails,paymentMethod, items,totalAmount } = context;
    const shipping = totalAmount<300? 30: 0;  
    const [tax, setTax] = useState(0);
    const router = useRouter();
    useEffect(()=>{
        if(!paymentMethod){
            router.push('/payment')
        }
        setDataLoading(true);
        setTax(Number(totalAmount) *.05);
        setDataLoading(false);
    },[context]);

    const placeOrderHandeler = async () => {
        setLoading(true)
    try {
        const item ={
            orderItems: items,
            shippingAddress: shippingDetails,
            paymentMethod: paymentMethod,
            itemsPrice: totalAmount,
            taxPrice: tax,
            shippingPrice: shipping,
            totalPrice: totalAmount+tax+shipping};
      setLoading(true);
      const data  = await fetch('/api/orders', {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json'
            },
      });
           setLoading(false);
      data&&router.push(data.url);

    } catch (err) {
      setLoading(false);
      toast.error('getError(err)');
    }
  };
  return (
    <Layout>
    <CheckoutWizard num='3'></CheckoutWizard>
    {
        (shippingDetails&&paymentMethod&&items&&totalAmount) ? 
    (<>
    <h2 className='text-2xl' >Place Order</h2>
    <div className='grid lg:grid-cols-4 gap-4'>
        <div className='col-span-3'>
        <div className='card '>
            <p className='pb-3'>Shipping Address</p>
            <p className='pb-2' >{shippingDetails.fullname}, {shippingDetails.email}, {shippingDetails.address}, {shippingDetails.city}, {shippingDetails.postalcode} </p>
            <div className='text-semibold text-blue-400'>
                <Link href='/shipping' >Edit</Link>
            </div>
        </div>
        <div className=' card '>
            <p className='pb-3'>Payment Method</p>
            <p className='pb-2' >{paymentMethod} </p>
            <div className='text-semibold text-blue-400'>
                <Link href='/payment' >Edit</Link>
            </div>
        </div>
        <div className='card'>
            <p className='pb-4'>Order Items</p>
            <table className='w-[100%]'>
                <thead className='border-b w-[100%]'>
                    <tr className='space-x-5 flex items-center justify-between w-[100%]' >
                    <th className='pb-3 '>Image </th>
                    <th className='pb-3'>Name</th>
                    <th className='pb-3'>Amout</th>
                    <th className='pb-3'>Price</th>
                    </tr>
                </thead>
                <tbody >
                    { (items&& items.length>0)&& items.map((item)=>(
                        <tr key={item.slug} className='pr-3 my-3 flex items-center justify-between '>
                             <td><Link href={`/product/${item.slug}`} >
                                <img className='w-12 mx-auto rounded cursor-pointer' src={item.image} alt={item.name}/>
                                </Link> 
                             </td>
                            <td className='ml-[-20px] text-yellow-300'><Link href={`/product/${item.slug}`} >
                                {item.name}
                                </Link> </td>
                            <td className='ml-[-30px]'>
                                {item.amount}
                            </td>
                            <td>{item.price} </td>
                        </tr>
                    )) }
                </tbody>
            </table>
            <div className='text-semibold text-blue-400'>
                <Link href='/' >Edit</Link>
            </div>
        </div>
        </div>
        <div className='col-span-1'>
            <div className='card text-lg space-y-1' >
                <div className='text-xl'>Order Summary</div>
                <div className=' flex items-center justify-between'>
                    <p >Items</p>
                    <p>${totalAmount}</p>
                </div>
                <div className='flex items-center justify-between'>
                    <p>Tax</p>
                    <p>${tax}</p>
                </div>
                <div className='flex items-center justify-between'>
                    <p>Shipping</p>
                    <p>${shipping}</p>
                </div>
                <div className='flex items-center justify-between'>
                    <p>Total</p>
                    <p>${totalAmount+tax+shipping}</p>
                </div>
                <button className='primary-button w-full' onClick={placeOrderHandeler} >Place Order</button>
            </div>
        </div>

    </div>
    </>):<div className='text-center text-red-400'>loading </div> 
    }
    </Layout>
  )
}

export default PlaceorderScreen;
placeorder.auth= true;