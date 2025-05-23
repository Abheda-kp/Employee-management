import {Request,Response,NextFunction} from "express";
import { HttpException } from "../exception/httpException";
import { get } from "http";
import { JWT_SECRET } from "../utils/constants";
import jwt from 'jsonwebtoken'
import { JwtPayLoad } from "../dto/jwt-payload";
const getToken=(req:Request):string => {
      const token=req.headers.authorization;
    if(!token)
        throw new HttpException(401,"Not authorized");
    const tokenSplits =token.split(' ');
    if(tokenSplits.length!=2)
        throw new HttpException(401,"Invalid token")
    return tokenSplits[1]
    
}
const authMiddleware=(req:Request,res:Response,next:NextFunction)=>{
       const token =getToken(req);
       if(!token)
           throw new HttpException(401,"Not authorized")
        try{
            const payload=jwt.verify(token,JWT_SECRET) as JwtPayLoad;
            req.user=payload;
           // console.log(payload)
        }catch{
            throw new HttpException(401,"Invalid or expired token")
        }
        //console.log(token)

        next();
  
}
 export default authMiddleware