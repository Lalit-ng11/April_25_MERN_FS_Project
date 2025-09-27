import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

// file Imports 
import authRoutes from './routes/authRoutes.js';
import transactionRoutes from "./routes/transactionRoutes.js";


const app = express();
app.use(express.json());
app.use(cors({origin:'http://localhost:5173'}));

// Routes 
app.use('/api/auth',authRoutes);
app.use('/api/transaction' , transactionRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('.........MongoDB Connected.........!');
    
})
.catch((err)=>{
    console.log(`DB Connection Error,${err}`);
    
})
app.listen(5000);