import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import CheckoutWizard from '../components/CheckoutWizard'
import Ctx from '../store/CartCtx'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import {toast} from 'react-toastify';
import Cookies from 'js-cookie'
const PaymentScreen = () => {
    const context = useContext(Ctx);
    const {addPaymentMenthod, paymentMethod}=context;
    const router = useRouter();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const submitHandler =(e)=>{
        e.preventDefault();
        if(!payment){
            return toast.error('please select a payment method')
        }
        addPaymentMenthod(payment);
        Cookies.set('payment',JSON.stringify(payment)); 
        router.push('/placeorder');
    }
    useEffect(()=>{
            setPayment(paymentMethod || '');
        if(!context.shippingDetails){
            router.push('/shipping')
        }
    },[context, router, paymentMethod])
  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2} />
      <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
        <h1 className="mb-4 text-xl">Payment Method</h1>
        {['PayPal', 'Stripe', 'CashOnDelivery'].map((payment) => (
          <div key={payment} className="mb-4">
            <input
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              id={payment}
              type="radio"
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />

            <label className="p-2" htmlFor={payment}>
              {payment}
            </label>
          </div>
        ))}
        <div className="mb-4 flex justify-between">
          <button
            onClick={() => router.push('/shipping')}
            type="button"
            className="default-button"
          >
            Back
          </button>
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
}
export default PaymentScreen;
payment.auth= true;
