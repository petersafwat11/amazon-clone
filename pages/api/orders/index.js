import { getSession } from 'next-auth/react';
import Order from '../../../models/Order';
import db from '../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('signin required');
  }

  const {user} = session;
  await db.connect();
  const newOrder = new Order({
    ...req.body,
    user: user._id,
  });
  const order = await newOrder.save();
    const id =order._id.toString();
  res.redirect(`/order/${id}`);
};
export default handler;