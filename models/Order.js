// import mongoose from 'mongoose';

// const orderSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     items: [
//       {
//         name: { type: String, required: true },
//         slug: { type: String, required: true },
//         amount: { type: Number, required: true },
//         image: { type: String, required: true },
//         price: { type: Number, required: true },
//       },
//     ],
//     shipDet: {
//       fullname: { type: String, required: true },
//       address: { type: String, required: true },
//       city: { type: String, required: true },
//       postalcode: { type: String, required: true },
//       email: { type: String, required: true },
//     },
//     payMethod: { type: String, required: true },
//     itemsPrice: { type: Number, required: true },
//     shipping: { type: Number, required: true },
//     tax: { type: Number, required: true },
//     total: { type: Number, required: true },
//     isPaid: { type: Boolean, required: true, default: false },
//     isDelivered: { type: Boolean, required: true, default: false },
//     paidAt: { type: Date },
//     deliveredAt: { type: Date },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
// export default Order;
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [
      {
        name: { type: String, required: true },
        slug: { type: String, required: true },
        amount: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      fullname: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalcode: { type: String, required: true },
      email: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    isDelivered: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
