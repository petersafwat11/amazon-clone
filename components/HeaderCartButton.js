import {BsCart} from 'react-icons/bs';
import { useContext, useEffect, useState } from 'react';
import Ctx from '../store/CartCtx';
import { useRouter } from 'next/router';
const HeaderCartButton = () => {
  const router = useRouter();
  const context = useContext(Ctx);
  const {items} = context;
  const [carItems, setCartItems] = useState('');
  useEffect(()=>{
    let x=0; 
  if (items.length>0 ){const num = items.map(item=>(
    x = x+item.amount
  ))}
  if(items.length===0){
    x=0
  }
      setCartItems(x)
  },[items,setCartItems ])
  
  
  const cartHandeler = ()=>{
    router.push('/cart')
  }
  return (
    <button className='relative flex items-center justify-center ' onClick={cartHandeler}>
      <span className='mx-3 md:mx-0' >
        <BsCart size={35} />
      </span>
      <span className='mx-3 hidden md:inline-block' >Your Cart</span>
      <span className='absolute top-[4px] md:left-[10px] left-[23px] text-yellow-300' > {carItems} </span>
    </button>
  );
};

export default HeaderCartButton;
