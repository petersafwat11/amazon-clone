import Link from 'next/link'
import React from 'react'
import Ctx from '../store/CartCtx'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
const OneProduct = ({product}) => {
  const context = useContext(Ctx);
  const addItemHamdeler = async (pro)=>{
      const obj= context.items.find(x =>(x.slug===product.slug));
      const {data} = await axios.get(`/api/products/${product._id}`);
      if(data.countInStock-1< obj?.amount){
              return toast.error('the product is out of stock');
      }
    const item ={
        name: pro.name,
        slug: pro.slug,
        price: pro.price,
        image: pro.image,
        amount: 1, 
    }
    context.addItem(item);
    toast.success('product added to the cart');
  }
  return (
    <div className='cart py-4' >
        <Link href={'/product/'+product.slug} >
           <img className='cursor-pointer w-full' src={product.image} alt={product.name}  />
        </Link>
        <div className='px-4 space-y-2 flex flex-col items-center justify-center'>
             <Link href={'/product/'+product.slug} >
                <h2 className='cursor-pointer' >{product.name }</h2>
            </Link>
            <p>{product.brand }</p>
            <p>  <span className='text-yellow-300 text-lg ' >$</span> {product.price} </p>
            <button className='primary-button' onClick={()=>{ addItemHamdeler(product)}} > Add to Cart</button>
        </div>
    </div>
  )
}

export default OneProduct
