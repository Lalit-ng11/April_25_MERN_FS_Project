import jwt from 'jsonwebtoken';

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({
            message:"Unothorized:Token not Provided..!"
        });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({
            message:"Token Invalid..!"
        })
    }

};
export default authMiddleware;
