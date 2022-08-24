import React from 'react'
import {FcCheckmark} from 'react-icons/fc'

const CheckoutWizard = ({num}) => {
    console.log(num)
  return (
    <>
    <div className='flex ml-40 space-x-52'>
     {['Login','Shipping Address','Payment Method','Place Order'].map((index, step)=>(
        <div key={step+1} className='flex flex-col items-center'>
          <div className=' mb-2 mt-2 bg-yellow-300 rounded-full px-2 w-6 cursor-pointer' >
              {num<step+1?step+1: <div className='w-6 py-2'> <FcCheckmark className='fill-white' size={10}/> </div>}</div>
          <div className='w-full font-semibold'>{index}</div>
        </div>
     ))}
    </div>
    </>
  )
}

export default CheckoutWizard
