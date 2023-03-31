import { Request, Response } from "express";
import { market } from "./database";
import { ICleaningProduct, IFoodProduct, IMarket } from "./interfaces";

const createProduct = (request:Request, response:Response):Response =>{
    const productData:Array<ICleaningProduct | IFoodProduct> = request.body

    const newArray:Array<ICleaningProduct | IFoodProduct> = productData.map((data ) =>{
        if(market.length > 0){
            data.id = market[market.length-1].id + 1
        } else {
            data.id = 1
        }
        data.expirationDate = new Date(new Date().setFullYear(new Date().getFullYear()+1))

        market.push(data)
        return data
    })
    
    const totalPrice:number = productData.reduce((acc, currentValue) =>{
        return acc + currentValue.price
    },0)

    const sendObj:IMarket = {
        total:totalPrice,
        marketProducts: newArray
    }

    return response.status(201).json(sendObj)
}

const listProducts = (request:Request, response:Response):Response =>{
    const totalPrice:number = market.reduce((acc, currentValue) =>{
        return acc + currentValue.price
    },0)

    const sendObj:IMarket = {
        total:totalPrice,
        marketProducts:market
    }

    return response.status(200).json(sendObj)
}

const listProductsById = (request:Request, response:Response):Response =>{
    const findIndex:number = response.locals.findIndex

    return response.status(200).json(market[findIndex])
}

const deleteProduct = (request:Request, response:Response):Response =>{
    const findIndex:number = response.locals.findIndex

    market.splice(findIndex,1)

    return response.status(204).send()
}

const updateProduct = (request:Request, response:Response):Response =>{
    const findIndex:number = response.locals.findIndex

    const updatedProduct:ICleaningProduct | IFoodProduct = {
        ...market[findIndex],
        ...request.body
    }

    market[findIndex] = updatedProduct

    return response.status(200).json(updatedProduct)
}


export { createProduct, listProducts, listProductsById, deleteProduct, updateProduct }