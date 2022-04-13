import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
    customerId:{
        type: String,
        required: true,
        maxlength: 60,
    },
    customer: {
        type: String,
        required: true,
        maxlength: 60,
    },
    total:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true,
        maxlength:200,
    },
    status:{
        type:Number,
        default:0,
    },
    method:{
        type: Number,
        required:true,
    },
    item: {
        type: [
            {
                title: { type: String, required: true },
                img: { type: String, required: true },
                extras: {
                    type: [
                        {
                            text: { type: String, required: true },
                            price: { type: Number, required: true },
                        },
                    ]
                },
                price: { type: Number, required: true },
                qty:{type:Number,required:true},
            },
        ]
    },
    

}, { timestamps: true });

export default mongoose.models.OrderItem || mongoose.model('OrderItem', OrderItemSchema);