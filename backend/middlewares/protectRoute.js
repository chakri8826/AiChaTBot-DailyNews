import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/ENV_VARS.js';
import { User } from '../models/User.js';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies['jwt-Token'];
        
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized - No Token" });
        }

        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
        
        if (!decoded) {
            return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
        }

        const user = await User.findById(decoded.userid).select("-password")
        if(!user){
            return res.status(404).json({success:false,message:"userNotfound"})
        }
        req.user=user
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware:", error.message);
        res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
    }
};