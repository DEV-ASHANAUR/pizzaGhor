import dbConnect from '../../../utilites/connect';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  //destract
  const {method} = req;
  //connect to mongodb
  dbConnect();

  //get all product
  if(method == 'GET'){
      try {
        const products = await Product.find();
        res.status(200).json(products);
      } catch (error) {
          res.status(500).json(error);
      }
  }
  //create product
  if(method == 'POST'){
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
  }

}