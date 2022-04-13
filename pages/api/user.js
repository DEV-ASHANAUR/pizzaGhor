import jwt from "jsonwebtoken";
import User from '../../models/User';
export default async function(req,res){
    const { cookies } = req;

    const jwtToken = await cookies.token;

    // console.log(c)
    if(jwtToken){
        try {
            const decode = await jwt.verify(jwtToken, process.env.SECRET);
            const user = await User.findById(decode.id).select('-password'); 
            res.json({success:true,user});
        } catch (error) {
            res.json({success:false,message:"Invalid Token"});
        }
    }else{
        res.json({success:false,message:"Invalid Token"});
    }
}