import express from 'express';
import Transaction from '../models/Transaction.js';
import authMiddleware from  '../middleware/authMiddleware.js'

const router = express.Router();

// Add Transaction 
router.post('/addtransaction',authMiddleware,async(req,res)=>{
    const {type,amount,category} = req.body;

    const newTransaction = new Transaction({
        type,
        amount,
        category,
        userId:req.user._id
    });

    try {
        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(500).json({
            message:"Error While Adding Transactions..!",
            error:err.message
        })
    }
});

// Get Transaction Data 
 router.get('/gettransaction',authMiddleware,async(req,res)=>{
    try {
        const transaction = await Transaction.find({
            userId:req.user._id
        });
        res.json(transaction);
    } catch (error) {
        res.status(402).json({
            message:"Error While Fetching Transaction Records..!"
        })
    }
 })
 export default router;