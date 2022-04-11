import dbConnect from '../../../utilites/connect';
import Product from '../../../models/Product';

export default async function handler(req,res){
    const {method,query:{id}} = req;

    //connectDb
    dbConnect();

    if(method == 'GET'){
        try {
            const product = await Product.findById(id);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}