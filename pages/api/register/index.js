import dbConnect from '../../../utilites/connect';
import User from '../../../models/User';
import bcript from 'bcrypt';

export default async function handler(req, res) {
  //destract
  const {method} = req;
  //connect to mongodb
  dbConnect();
  
  if(method == 'GET'){
    res.json({msg:"this register"});
  }
  //create product
  if(method == 'POST'){
    const {name,email,password} = req.body;
    try {
          if(!await User.findOne({email:email})){
            const salt = await bcript.genSalt(10);
            const hashPassword = await bcript.hash(password,salt);
            const user = await User.create({name:name,email:email,password:hashPassword});
            res.status(201).json(user);
          }else{
            res.status(400).json({err:'user Already exist'});
          }
    } catch (error) {
        res.status(500).json(error);
    }
  }

}