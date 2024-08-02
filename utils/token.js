import { JsonWebTokenError } from "jsonwebtoken";


export const generateToken = (payload) => { 
    return JsonWebTokenError.sign(payload, process.env.JWT_SECRET, { expiresIn: expire });
}