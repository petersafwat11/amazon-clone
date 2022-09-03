import Product from "../../../models/Product";
import db from "../../../utils/db";

const handeler= async(req, res)=>{
    if (req.method==="POST"){
        await db.connect();
        const product = Product.find({name:req.body.value}).then(result=>{
            result.length>0&&res.send(result);
        }).catch(err=>{
            console.log(err);
        });
        const catProducts = Product.find({category:req.body.value}).then(result=>{
            result.length>0&&res.send(result);
        }).catch(err=>{
            console.log(err);
        });
        const brandProducts = Product.find({brand:req.body.value}).then(result=>{
            result.length>0&&res.send(result);
            result.length===0&& res.send('not found');            
        }).catch(err=>{
            res.send('not found');
            console.log(err);
        });

        await db.disconnect();
    }
}
export default handeler; 