import { NextFunction, Request, Response } from "express";
import { market } from "./database";
import { ICleaningProduct, IFoodProduct } from "./interfaces";

const ensureProductExistsMiddleware = (request:Request, response:Response, next:NextFunction) =>{
    const id:number = Number(request.params.id)

    const findIndex:number = market.findIndex((data) => data.id == id)

    if(findIndex === -1){
        return response.status(404).json({
            error:'Product not found'
        })
    }

    response.locals.findIndex = findIndex

    return next()

}

const verifyNameAlreadyExists = (request:Request, response:Response, next:NextFunction) =>{
    const productData:Array<ICleaningProduct | IFoodProduct> = request.body

    productData.forEach((data)=>{

        const nameAlreadyExists:boolean = market.some((product) => product.name == data.name)
        if(nameAlreadyExists){
           return response.status(409).json({
                error:'Product already registered' 
            })
        }
    })

    return next()

}

const verifyUpdatedNameAlreadyExists = (request:Request, response:Response, next:NextFunction) =>{
    const id:number = Number(request.params.id)
    const product:ICleaningProduct | IFoodProduct = request.body

    const findIndex:number = market.findIndex((data) => data.id == id)

    if(market[findIndex].name === product.name){

        return response.status(409).json({
            error:'Product already registered' 
        })
    }


    return next()

}

export { ensureProductExistsMiddleware, verifyNameAlreadyExists, verifyUpdatedNameAlreadyExists }