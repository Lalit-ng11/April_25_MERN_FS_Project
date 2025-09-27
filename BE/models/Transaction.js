import mongoose from "mongoose";

const TransationSchema = new mongoose.Schema({
    type:{
        type:String,
        enum:["Income","Expense"],
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userExpense1",
        required:true
    }
})
export default mongoose.model('transaction1',TransationSchema);