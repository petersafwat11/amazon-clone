import db from "../../../utils/db"
import Product from "../../../models/Product";

const handeler= async (req,res)=>{
    db.connect();
    const product = await Product.findById(req.query.id);
    db.disconnect();
    res.send(product);
};

export default handeler;