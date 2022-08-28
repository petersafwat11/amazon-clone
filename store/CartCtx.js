import { createContext } from "react";

 const Ctx = createContext({
  totalAmount: 0, 
  items : [],
  shippingDetalis: {},
  paymentMethod: '',
  addItem: (item)=>{},
  removeItem : (item)=>{},
  clearItems: (item)=>{},
  updateItem: (item)=>{},
  addShippingDetails:(item)=>{},
  addPaymentMenthod: (item)=>{}
 }) 



export default Ctx ;
