import dbConnect from '../../../../utilites/connect';
import orderItem from '../../../../models/orderItem';

export default async function handler(req,res){
    const {method} = req;

    //connectDb
    dbConnect();

    if(method == 'POST'){
        const _id = req.body.id;
        try {
            const order = await orderItem.remove({_id});
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}