import { hashSync } from "bcryptjs";
import { getSession } from "next-auth/react";
import User from "../../../models/Users";
import db from "../../../utils/db";

const handeler = async(req, res)=>{
    if (req.method !== 'PUT') {
        res.status(402).send({message: ' method is not correct'})
    return;
  }
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: 'signin required' });
  }
      const {email, name, password}= req.body;

  const { user } = session;

  if (
    !name ||!email ||!email.includes('@') ||
    (password && password.trim().length < 5)
  ) {
    res.status(422).json({
      message: 'Validation error',
    });
    return;
  }

    await db.connect();
  const updatedUser = await User.findById(user._id);
    updatedUser.email = email;
    updatedUser.name = name;
    if(password){
        updatedUser.password = hashSync(password);
    }
    await updatedUser.save();
    await db.disconnect();
    res.send({
        message: 'updated successfully',
    })
}
export default handeler;