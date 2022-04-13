import dbConnect from '../../../utilites/connect';
import cookie from "cookie";
import User from '../../../models/User';
import bcript from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  //destract
  const {method} = req;
  //connect to mongodb
  dbConnect();
  
  if(method == 'GET'){
    res.json({msg:"this login"});
  }
  //create product
  if(method == 'POST'){
    const {email,password} = req.body;
    try {
          const user = await User.findOne({email:email})
          if(user){
              const isMatch = await bcript.compare(password,user.password);
              if(user.email == email && isMatch){
                    let isAdmin = user.role == 'user'? false : true;
                    
                    const token = jwt.sign({id:user._id,name:user.name,isAdmin},process.env.SECRET);
                    
                    res.setHeader(
                        "Set-Cookie",
                        cookie.serialize("token", token, {
                          maxAge: 60 * 60,
                          sameSite: "strict",
                          path: "/",
                        })
                      );
                    res.status(200).json('success');
              }else{
                res.json({err:'Invaild User And Password'});
              }
          }else{
            res.status(400).json({err:'Invaild User And Password'});
          }
    } catch (error) {
        res.status(500).json(error);
    }
  }

}

