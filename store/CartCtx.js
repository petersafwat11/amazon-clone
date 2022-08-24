import { createContext } from "react";

 const Ctx = createContext({
  totalAmount: 0, 
  items : [],
  addItem: (item)=>{},
  removeItem : (item)=>{},
  clearItems: ()=>{},
  updateItem: ()=>{},
  shippingDetalis: {},
  addShippingDetails:(item)=>{},
  paymentMethod: ''
 }) 



export default Ctx ;
