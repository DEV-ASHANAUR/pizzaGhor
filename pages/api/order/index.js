import dbConnect from '../../../utilites/connect';
import OrderItemSchema from '../../../models/orderItem';

export default async function handler(req, res) {
  //destract
  const { method } = req;
  //connect to mongodb
  dbConnect();

  //get all product
  if (method == 'GET') {
    try {
      const orderItem = await OrderItemSchema.find();
      res.status(201).json(orderItem);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  //create product
  if (method == 'POST') {
    try {
      const orderItem = await OrderItemSchema.create(req.body);
      res.status(201).json(orderItem);
    } catch (error) {
      res.status(500).json(error);
    }
  }

}