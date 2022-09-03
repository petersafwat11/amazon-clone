import { createContext } from "react";

 const Ctx = createContext({
  totalAmount: 0, 
  items : [],
  shippingDetalis: {},
  paymentMethod: '',
  searchItems:[],
  addItem: (item)=>{},
  removeItem : (item)=>{},
  clearItems: (item)=>{},
  updateItem: (item)=>{},
  addShippingDetails:(item)=>{},
  addPaymentMenthod: (item)=>{},
  setSearchItems: (items)=>{}
 }) 



export default Ctx ;
