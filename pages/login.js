import React, { useEffect } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import {useForm} from 'react-hook-form'
import {signIn,useSession }from 'next-auth/react'
import getError from'../utils/error'
import {useRouter} from 'next/router'
import {toast} from 'react-toastify'
 
const LoginScreen = () => {
    const {data:session} = useSession();
    const router = useRouter();
     const{redirect} = router.query;

    useEffect(()=>{
        if(session?.user){
            router.push(redirect || '/')
        }
    },[router, session, redirect])
   const { register, handleSubmit, formState: { errors } } = useForm();
    const formHandeler= async ({email, password})=>{
        try{
            const result =await signIn('credentials',{
                redirect: false,
                email,
                password
            });
            if(result.error){
                toast.error(result.err)
            }
        } catch(err){
            toast.error(getError(err))
        }
    }
  return (
    <Layout>

    <div className='max-w-screen-md mx-auto py-4'>
      <p className='text-xl mb-4 font-semibold'> Login</p>
      <div>
        <form className='space-y-4' onSubmit={handleSubmit(formHandeler)}>
            <div className='flex flex-col'>
                <label htmlFor='email'>Email</label>
                <input type='text' {...register('email', {required: 'please enter your email',
                 pattern:{ value: /^[A-Za-z0-9_.+-]+@[A-Za-z0-9-]+.[A-Za-z0-9-]+$/i, message:'enter a valid email'} })} id='email' className='w-full rounded p-3 my-2 shadow border outline-none ring-indigo-300 focus:ring ' autoFocus/>
                {errors.email&& <div className='text-red-500'>{errors.email?.message} </div>}
            </div>
            <div className='flex flex-col'>
                <label htmlFor='password'>Password</label>
                <input type='password' {...register('password' ,{required: 'please enter your password',
                minLength:{ value:6, message:'your password should be at least 6 character long'}
                })} id='password' className='w-full p-3 my-2 rounded shadow border outline-none ring-indigo-300 focus:ring ' autoFocus/>
                 {errors.email&& <div className='text-red-500'>{errors.password?.message}  </div>}
            </div>
            <div className='flex flex-col'>
                <button className='primary-button'> Login</button>
                <p>don&apos;t have an account ? <span className='text-yellow-300 '>
                   <Link href={`/register?redirect=${redirect || '/'}`}>Register</Link></span>
                </p>
            </div>
        </form>
      </div>
    </div>
  </Layout>

  )
}

export default LoginScreen
