import { NextFunction,Request,Response } from "express";

const isAdmin: boolean = false;

export const check = (req:Request,res:Response,next:NextFunction)=>{
    if(isAdmin){
        console.log(req)
        return next();
    }
    else{
        res.status(401).json({
            data:'Unhautorized'
        })
    }
}

