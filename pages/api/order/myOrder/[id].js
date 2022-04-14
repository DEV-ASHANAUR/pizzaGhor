import dbConnect from '../../../../utilites/connect';
import orderItem from '../../../../models/orderItem';

export default async function handler(req,res){
    const {method,query:{id}} = req;

    //connectDb
    dbConnect();

    if(method == 'GET'){
        try {
            const order = await orderItem.find({customerId:id});
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}