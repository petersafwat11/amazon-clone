import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import CheckoutWizard from '../components/CheckoutWizard'
import Ctx from '../store/CartCtx'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import {toast} from 'react-toastify';
import Cookies from 'js-cookie'
const payment = () => {
    const context = useContext(Ctx);
    const {addPaymentMenthod, paymentMethod, shippingDetalis}=context;
    const router = useRouter();
    const [payment, setPayment] = useState('');
    const submitHandeler =(e)=>{
        e.preventDefault();
        if(!payment){
            
            return toast.error('please select a payment method')
        }
        addPaymentMenthod(payment);
        Cookies.set('payment',JSON.stringify(payment)); 
        router.push('/placeorder');
    }
    useEffect(()=>{
        if(paymentMethod){
            setPayment(paymentMethod);
        }
        if(!context.shippingDetails){
            router.push('/shipping')
        }
    },[context, router])
  return (
    <Layout title='payment'>
        <CheckoutWizard num={2}></CheckoutWizard>
        <div className='text-2xl ml-[17%]'>Payment Method</div>
        <form className='mx-auto max-w-[60%]' >
            {['Paypal', 'Stripe', 'Cash'].map((step, index)=>(
                <div key={step}>
                    <input onChange={()=>{setPayment(step); }} type='radio' className='text-xl my-4 mx-2' id={step} name="paymentMethod" value={payment===step}/>
                    <label className='text-xl' htmlFor={step} >{step}</label>
                </div>
            ))}
            <div className='flex flex-col'>
                <button className='primary-button' type='submit' onClick={(e)=>{submitHandeler(e)}}>Next</button>
                <button type='button' className='default-button' onClick={()=>{router.push('/shipping')}}>Back</button>                
            </div>
        </form>
    </Layout>
  )
}

export default payment;
payment.auth= true;
