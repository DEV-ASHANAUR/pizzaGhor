import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:60,
    },
    email:{
        type:String,
        required:true,
        maxlength:70,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user",
    },
},{timestamps:true});

export default mongoose.models.User || mongoose.model('User',UserSchema);