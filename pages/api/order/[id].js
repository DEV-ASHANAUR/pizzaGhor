import dbConnect from '../../../utilites/connect';
import orderItem from '../../../models/orderItem';

export default async function handler(req,res){
    const {method,query:{id}} = req;

    //connectDb
    dbConnect();

    if(method == 'GET'){
        try {
            const order = await orderItem.findById(id);
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    if (method === "PUT") {
        try {
          const order = await orderItem.findByIdAndUpdate(id, req.body, {
            new: true,
          });
          res.status(200).json(order);
        } catch (err) {
          res.status(500).json(err);
        }
      }
}