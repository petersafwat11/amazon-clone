import {useContext, useEffect} from 'react'
import Layout from '../components/Layout'
import {useForm} from 'react-hook-form'
import CheckoutWizard from '../components/CheckoutWizard'
import Ctx from '../store/CartCtx'
import { useRouter } from 'next/router'
import  Cookies  from 'js-cookie'
const shipping = () => {
    const context = useContext(Ctx);
        const router= useRouter();
      const { register, handleSubmit, setValue,formState: { errors }  } = useForm();
        const submitHandeler =({fullname, email,city,address,postalcode})=>{
            // const item = {fullname: fullname, email:email, address:address, city:city, postalcode:postalcode}
            context.addShippingDetails({fullname: fullname, email:email, address:address, city:city, postalcode:postalcode});
            Cookies.set('shipping', JSON.stringify({fullname: fullname, email:email,address:address, city: city, postalcode:postalcode }));                
            router.push('/payment')
        }
         const {shippingDetails}= context;
        useEffect(()=>{
            if(context.items.length<1){
                router.push('/')
            }
                setValue('fullname',shippingDetails.fullname );
                setValue('email',shippingDetails.email );
                setValue('city',shippingDetails.city );
                setValue('address',shippingDetails.address );
                setValue('postalcode',shippingDetails.postalcode )

        },[shippingDetails,setValue]);
  return (
    <Layout title='shipping'>
        <CheckoutWizard num={1} ></CheckoutWizard>
        <div className='ml-[17%] text-2xl my-2'>Shipping Address</div>
        <form className='w-[60%] ml-[20%]' onSubmit={handleSubmit(submitHandeler)} >
            <div className='flex flex-col'>
                <label htmlFor='fullname'> Full Name</label>
                <input {...register('fullname', {required: ' enter your fullname', minLength:{ value:5, message:' enter a valid name'}})} id='fullname' type='text' className='input'/>
                {errors.fullname&&<div className='text-red-500' >{errors.fullname.message}</div>}
            </div>
            <div className='flex flex-col'>
                <label htmlFor='email'>Email </label>
                <input  {...register('email', {required: ' enter your email', pattern:{ value: /^[A-Za-z0-9_.+-]+@[A-Za-z0-9-]+.[A-Za-z0-9-]+$/i, message:'enter a valid email'}})} id='email' type='email' className='input'/>
                 {errors.email&&<div className='text-red-500' >{errors.email.message}</div>}
            </div>
            <div className='flex flex-col'>
                <label htmlFor='address'>Address</label>
                <input {...register('address', {required: 'enter your address'})} id='address' type='text' className='input'/>
                {errors.address&&<div className='text-red-500' >{errors.address.message}</div>}
            </div>
            <div className='flex flex-col'>
                <label htmlFor='city'>City</label>
                <input {...register('city', {required: ' enter your city'})} id='city' type='text' className='input '/>
                {errors.city&&<div className='text-red-500' >{errors.city.message}</div>}
            </div>
            <div className='flex flex-col'>
                <label htmlFor='postalcode'>Postal Code</label>
                <input {...register('postalcode' ,{required: 'enter your postalcode',
                minLength:{ value:4, message:' enter a valid postalcode'}
                })} id='postalcode' type='num' className='input'/>
                  {errors.postalcode&&<div className='text-red-500' >{errors.postalcode.message}</div>}
            </div>
            <button className='primary-button w-full'> Continue</button>
        </form>

    </Layout>
  )
}

export default shipping

shipping.auth= true;