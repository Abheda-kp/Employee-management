import {NextFunction,Request,Response} from "express";
import { HttpException } from "../exception/httpException";
import { stat } from "fs";
import { LoggerService } from "../services/logger.service";
const logger=LoggerService.getInstance('app()');
export const errorMiddleware=(error:Error,req:Request,res:Response,next:NextFunction) =>{
           try{
             if(error instanceof HttpException){
                const status:number=error.status || 500;
                const message:string=error.message || "Something went wrong";
                let respbody={message:message};
                res.status(status).json(respbody);
                logger.error(`$(error.status) $(error.message)`)
             }
             else{
               logger.error(error.stack)
               res.status(500).send({error:error.message})
             }

                
           }catch(err){
            next(err)
           }
}