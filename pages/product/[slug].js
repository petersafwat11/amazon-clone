import React from 'react'
import { useRouter } from 'next/router'
import { useEffect,useContext } from 'react'
import Layout from '../../components/Layout'
import data from '../../utils/data'
import Link from 'next/link'
import Ctx from '../../store/CartCtx'
import db from '../../utils/db'
import Product from '../../models/Product'
import axios from 'axios'
import { toast } from 'react-toastify'
const ProductScreen = ({product}) => {
   const context = useContext(Ctx)
    const router= useRouter();
    if(!product){
        return(
          <Layout title='not-found'>
              <h1> product not found</h1>
          </Layout>
        )
    }
    const addItemHandeler = async ()=>{
      const {data} = await axios.get(`/api/products/${product._id}`);
      const obj= context.items.find(x =>(x.slug===product.slug));
      if(obj!== undefined){
              if(data.countInStock-1 < obj.amount  ){
      return toast.error('product is out of stock') ;
    }
      }
        const item = {
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.image,
        amount: 1, 
      }
      context.addItem(item);
      toast.success('product added to the cart');
    }


  return (
    <Layout title={product.slug} >  
              <div className='text-yellow-300 mb-4 text-lg font-semibold' >
                 <Link href='/' > back to home page</Link>
              </div>
             <div className='grid md:grid-cols-4 gap-5  '>
                <img src={product.image} className='col-span-2 ' alt={product.name}/>
                <div>
                  <ul className='space-y-2 text-lg capitalize '>
                    <li className='uppercase font-semibold my-6' > {product.name}</li>
                    <li>category: {product.category} </li>
                    <li>brand: {product.brand} </li>
                    <li>{product.rating} of {product.numReviews} reviews </li>
                    <li> description : {product.description} </li>
                  </ul>
                </div>
                <div className='rounded-lg h-48 p-4 text-lg shadow max-h-min flex flex-col justify-between' >
                  <div className='flex justify-between items-center '>
                    <span>price </span>
                    <span> {product.price} </span>
                  </div>
                  <div className='flex justify-between items-center '>
                    <span>status </span>
                    <span> {product.countInStock>0 ? 'Instock' : 'Unavailable '} </span>
                  </div>
                  <button className='primary-button' onClick={addItemHandeler} >Add to cart </button>
                </div>
             </div>
    </Layout>
  )
}

export default ProductScreen;
export async function getServerSideProps(context) {
  const {params}= context;
  const {slug} = params;
  await db.connect();

  const product = await Product.findOne({slug:slug}).lean();
  return {
    props: {
      product: product? db.convertDocToObj(product): null,
    },
  };
}