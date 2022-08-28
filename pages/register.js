import React, { useEffect } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import {useForm} from 'react-hook-form'
import {signIn,useSession }from 'next-auth/react'
import getError from'../utils/error'
import {useRouter} from 'next/router'
import axios from 'axios'
import { toast } from 'react-toastify'
 
const registerScreen = () => {
    const {data:session} = useSession();
    const router = useRouter();
     const{redirect} = router.query;

    useEffect(()=>{
        if(session?.user){
            router.push(redirect || '/')
        }
    },[router, session, redirect])
   const { register, handleSubmit,getValues, formState: { errors } } = useForm();
    const formHandeler= async ({email, name, password})=>{
        try{
            await axios.post('/api/auth/signup', {
                    name,
                    email,
                    password,
                });     
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
                <label htmlFor='name'>name</label>
                <input type='text' {...register('name', {required: 'please enter your name',
                  })} id='name' className='w-full rounded p-3 my-2 shadow border outline-none ring-indigo-300 focus:ring ' autoFocus/>
                {errors.name&& <div className='text-red-500'>{errors.name?.message} </div>}
            </div>
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
                 {errors.password&& <div className='text-red-500'>{errors.password?.message}  </div>}
            </div>
            <div className='flex flex-col'>
                <label htmlFor='confirm'>confirm password</label>
                <input type='password' {...register('confirm' ,{required: 'please enter your password',
                minLength:{ value:6, message:'your password should be at least 6 character long'},
                validate: (value)=>(value === getValues('password') )
                })} id='confirm' className='w-full p-3 my-2 rounded shadow border outline-none ring-indigo-300 focus:ring ' autoFocus/>
                 {errors.confirm&& <div className='text-red-500'>{errors.confirm?.message}  </div>}
                {errors.confirm &&errors.confirm.type === 'validate' && (
                <div className="text-red-500 ">Password do not match</div>
                )}
            </div>
            <div className='flex flex-col'>
                <button className='primary-button'> signup</button>
            </div>
            <div className="mb-4 ">
            Don&apos;t have an account? &nbsp;
            <Link href={`/register?redirect=${redirect || '/'}`}>Register</Link>
            </div>            
        </form>
      </div>
    </div>
  </Layout>

  )
}

export default registerScreen
