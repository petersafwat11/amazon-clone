import Ctx from './CartCtx';
import { useReducer } from 'react';
import Cookies from 'js-cookie';

const defaultVal = {
    items: Cookies.get('cart')? JSON.parse(Cookies.get('cart')) : [] ,
    totalAmount : Cookies.get('total')? JSON.parse(Cookies.get('total')): '' ,
    shippingDetails:Cookies.get('shipping')? JSON.parse(Cookies.get('shipping')) : {},
    paymentMethod: Cookies.get('payment')? JSON.parse(Cookies.get('payment')) : ''
}
const reducerCart= (state, action)=>{
    if(action.type=== 'ADD'){
        let exist = state.items.length>0? state.items.filter(item =>(item.slug===action.item.slug)): '';
        if ( exist.length > 0){
             exist[0] = {...exist[0], amount:exist[0].amount + action.item.amount }; 
            const otherItems = state.items.filter(item=>(item.name !== action.item.name));
            const newTotalAmount = state.totalAmount + action.item.amount * action.item.price;
            Cookies.set('cart', JSON.stringify(otherItems.concat(exist[0])));
            Cookies.set('total', JSON.stringify(newTotalAmount));
            return {...state,items:otherItems.concat(exist[0]), totalAmount: newTotalAmount}
        }
        const newTotalAmount = state.totalAmount + action.item.amount * action.item.price;
      Cookies.set('cart', JSON.stringify(state.items.concat(action.item)));
        Cookies.set('total', JSON.stringify(+newTotalAmount));
        return {...state, items:state.items.concat(action.item), totalAmount: +newTotalAmount}
    }
    if (action.type=== 'REMOVE'){
        
        let exist= state.items.filter(item=>(item.name=== action.item.name));
        const newTotalAmount = state.totalAmount- action.item.price* exist[0].amount; 
        const newItems= state.items.filter(item=>(item.slug !== action.item.slug));
         Cookies.set('cart', JSON.stringify({newItems}))
        Cookies.set('total', JSON.stringify(newTotalAmount));
        return { ...state, items: newItems, totalAmount: newTotalAmount}
    }
    if (action.type==='CLEAR'){
         Cookies.set('cart', JSON.stringify([]));
        Cookies.set('total', JSON.stringify(0));
        return {...state, items: [], totalAmount: 0}
    }
    if(action.type==='UPDATE' ){
       const exist= state.items.find(x=>(x.slug=== action.item.slug));
       const otherItems= state.items.filter(x=>(x.slug!== action.item.slug));
       const newOne = {...exist, amount:action.value};
       const newTotalAmount = state.totalAmount+ action.item.price* (newOne.amount -exist.amount); 
         Cookies.set('cart', JSON.stringify( otherItems.concat(newOne)));
        Cookies.set('total', JSON.stringify(newTotalAmount));
       return {...state, items: otherItems.concat(newOne), totalAmount: newTotalAmount};
    }
    if(action.type==='SHIPDET'){
                console.log(action.item);
         return{...state, shippingDetails: {fullname: action.item.fullname, email:action.item.email, address:action.item.address, city: action.item.city, postalcode:action.item.postalcode}}
    }
        if(action.type==='PAYMENT'){
        return{...state, paymentMethod:action.item }
    }

    return defaultVal;
}
const ContextProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(reducerCart, defaultVal);
    
    const addItem= (item)=>{
        dispatchCartAction({type: 'ADD', item: item})
    };
    const removeItem= (item)=>{
        dispatchCartAction({type: 'REMOVE', item: item})
    };
    const clearItems= ()=>{
        dispatchCartAction({type: 'CLEAR'})
    }
    const updateItem= (value,item)=>{
        dispatchCartAction({type: 'UPDATE', item: item, value: Number(value)})
    }
    const addShippingDetails=(item)=>{
        dispatchCartAction({type:'SHIPDET', item: item})
    }
    const addPaymentMenthod =(item)=>{
        dispatchCartAction({type:'PAYMENT', item: item})
    }
    const context ={
        items:  cartState.items ,
        shippingDetails:cartState.shippingDetails,
        paymentMethod: cartState.paymentMethod,
        totalAmount: cartState.totalAmount,
        addItem: addItem,
        removeItem: removeItem,
        clearItems : clearItems,
        updateItem: updateItem,
        addShippingDetails:(item)=>{},
        addPaymentMenthod:(item)=>{},
    };
  return (
        <Ctx.Provider value={context}>
            {props.children}
        </Ctx.Provider>
    )
}

export default ContextProvider;
