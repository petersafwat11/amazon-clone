import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState,useCallback } from 'react'
import Layout from '../../components/Layout';
import OneProduct from '../../components/Product';
import Ctx from '../../store/CartCtx';
const SearchScreen = () => {
    const {query}= useRouter();
    const val= query.id; 
    const context = useContext(Ctx);
    const {searchItems}= context;
    const [filteredByCatygory, setFilteredByCatygory]= useState([]);
    const [filteredByBrands , setFilteredByBrands]= useState([]);  
    const [filteredByPrice, setFilteredByPrice]= useState([]); 
    const [filteredByRatings, setFilteredByRatings]= useState([]);
    const [sortByPrice , setSortByPrice]= useState([]); 
    const [filteredItems, setFilteredItems]= useState([]);
    const updateCatHandeler =useCallback((val)=>{
      setCatFiltered(val);
      if(val==='All'){
       setFilteredByCatygory(searchItems);       
      }
      if(val!=='All'){
       setFilteredByCatygory(searchItems.filter(item=> item.category=== val));
      }
    },[val,setFilteredByCatygory,searchItems])
    const updateBrandHandeler =useCallback((val)=>{
      setBrandFiltered(val);
      if(val==='All'){
       setFilteredByBrands(filteredByCatygory);       
      }
      if(val!=='All'){
       setFilteredByBrands(filteredByCatygory.filter(item=> item.brand=== val));
      }
    },[val,setFilteredByBrands,filteredByCatygory ])
    const updatePriceHandeler =useCallback((val)=>{
      setPriceFlitered(val);
      if(val==='All'){
       setFilteredByPrice(filteredByBrands);       
      }
      if(val==='50$ to 60$'){
       setFilteredByPrice(filteredByBrands.filter(item=> item.price>= 50 &&item.price<=60));
      }
      if(val==='60$ to 70$'){
       setFilteredByPrice(filteredByBrands.filter(item=> item.price>= 60 &&item.price<=70));
      }
      if(val==='70$ to 80$'){
       setFilteredByPrice(filteredByBrands.filter(item=> item.price>= 70 &&item.price<=80));
      }
      if(val==='80$ to 100$'){
       setFilteredByPrice(filteredByBrands.filter(item=> item.price>= 80 &&item.price<=100));
      }
      if(val==='100$ to 150$'){
       setFilteredByPrice(filteredByBrands.filter(item=> item.price> 100 &&item.price<150));
      }
      if(val==='150$ to 200$'){
       setFilteredByPrice(filteredByBrands.filter(item=> item.price> 150 &&item.price<200));
      }
    },[val,setFilteredByPrice,filteredByBrands ])
    const updateStarsHandeler =useCallback((val)=>{
      setStarsFiltered(val);
      if(val==='All'){
       setFilteredByRatings(filteredByPrice);       
      }
      if(val==='1 star & ups'){
       setFilteredByRatings(filteredByPrice.filter(item=> item.rating> 1 ));
      }
      if(val==='2 star & ups'){
       setFilteredByRatings(filteredByPrice.filter(item=> item.rating> 2 ));
      }
      if(val==='3 star & ups'){
       setFilteredByRatings(filteredByPrice.filter(item=> item.rating> 3 ));
      }
      if(val==='4 star & ups'){
       setFilteredByRatings(filteredByPrice.filter(item=> item.rating> 4 ));
      }

    },[val,setFilteredByRatings, filteredByPrice])
    const updateSortingHandeler= useCallback((val)=>{
      setSortFlitered(val);
        if(val==='price:high to low'){
          // console.log(val);
       setSortByPrice(filteredByRatings.sort((a,b) => b.price- a.price ));
       console.log(filteredByRatings.sort((a,b) => b.price - a.price ))
      }
      if(val==='price:low to high'){
       setSortByPrice(filteredByRatings.sort((a,b) => a.price - b.price));
       console.log(filteredByRatings.sort((a,b) => a.price - b.price ))
      }
      else{
        setSortByPrice(filteredByRatings)
      }

    },[val,setSortByPrice,filteredByRatings ])
    // objs.sort((a,b) => a.last_nom - b.last_nom); 
    const [catFlitered, setCatFiltered]= useState('All') ;
    const [brandFiltered, setBrandFiltered]= useState('All');
    const [priceFlitered, setPriceFlitered]= useState('All'); 
    const [starsFlitered, setStarsFiltered]= useState('All');
    const [sortFlitered, setSortFlitered] = useState('no filters')
    useEffect(()=>{
      setFilteredByCatygory(searchItems);   
    },[searchItems,setFilteredByCatygory])
    useEffect(()=>{
       updateBrandHandeler(brandFiltered);       
    },[updateBrandHandeler,brandFiltered ])
    useEffect(()=>{
      updatePriceHandeler(priceFlitered)
    },[updatePriceHandeler,priceFlitered])
    useEffect(()=>{
       updateStarsHandeler(starsFlitered);       
    },[updateStarsHandeler,starsFlitered ])
    // useEffect(()=>{
    //    setSortByPrice(filteredByRatings);
    // },[filteredByRatings,setFilteredByPrice ])
    useEffect(()=>{
      updateSortingHandeler(sortFlitered);   
    },[sortFlitered,updateSortingHandeler]);
    useEffect(()=>{
       setFilteredItems(sortByPrice);
    },[sortByPrice,setFilteredItems ]);


  return (
    <Layout title={val}>
        <div className='grid md:grid-cols-4 gap-3 mt-4'>
            <div className='md:ml-6'>
                <div className='my-4' >
                    <p className='py-1'>Categories</p>
                    <select className='w-full p-2 focus-visible:outline-none focus:border-2 focus:border-blue-300 shadow-blue-200 shadow-sm' defaultValue={catFlitered} onChange={(e)=>{ updateCatHandeler(e.target.value)}} >

                    {
                    ['All','Pants', 'Shirts'].map(cat=>(
                        <option key={cat} value={cat} > {cat}</option>
                          ))}
                    </select>

                </div>
                <div className='my-4' >
                    <p className='py-1'>Brands</p>
                    <select className='w-full p-2 focus-visible:outline-none focus:border-2 focus:border-blue-300 shadow-blue-200 shadow-sm' defaultValue={brandFiltered} onChange={(e)=>{ updateBrandHandeler(e.target.value)}} >

                    {
                    [ 'All','Nike','Adidas', 'Zara', 'Raymond', 'Oliver', 'Casely'].map(cat=>(
                        <option key={cat} value={cat} > {cat}</option>
                          ))}
                    </select>
                </div>
                <div className='my-4' >
                    <p className='py-1'>Prices</p>
                    <select className='w-full p-2 focus-visible:outline-none focus:border-2 focus:border-blue-300 shadow-blue-200 shadow-sm' defaultValue={priceFlitered} onChange={(e)=>{ updatePriceHandeler(e.target.value)}} >

                    {
                    [ 'All','50$ to 60$','60$ to 70$','70$ to 80$','80$ to 100$','100$ to 150$', '150$ to 200$'].map((cat)=>(
                        <option key={cat} value={cat} > {cat}</option>
                          ))}
                    </select>
                </div>
                <div className='my-4' >
                    <p className='py-1'>Ratings</p>
                    <select className='w-full p-2 focus-visible:outline-none focus:border-2 focus:border-blue-300 shadow-blue-200 shadow-sm' defaultValue={starsFlitered} onChange={(e)=>{ updateStarsHandeler(e.target.value)}} >

                    {
                    ['All','1 star & ups', '2 star & ups', '3 star & ups', '4 star & ups'].map(cat=>(
                        <option key={cat} value={cat} > {cat}</option>
                          ))}
                    </select>
                </div>
            </div>
            <div className='col-span-2 grid md:grid-cols-2 md:gap-3 '>
            {(filteredItems.length > 0 &&filteredItems.map)? filteredItems.map(product=>(<OneProduct key={product.slug} product={product} />)):
             <h1>not found</h1>} 
            </div>
            <div className='flex items-start space-x-2'>
              <p className='mt-2' >Sort By</p>      
              <select className='w-[70%] p-2 focus-visible:outline-none focus:border-2 focus:border-blue-300 shadow-blue-200 shadow-sm' defaultValue={sortFlitered} onChange={(e)=>{ updateSortingHandeler(e.target.value)}} >

              {
              [ 'no filters','price:high to low', 'price:low to high'].map(cat=>(
              <option key={cat} value={cat} > {cat}</option>
                ))}
              </select>

            </div>
        </div>
    </Layout>
  )
}

export default SearchScreen
