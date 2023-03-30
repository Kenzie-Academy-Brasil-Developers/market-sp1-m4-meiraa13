import express, { Application } from "express";
import { createProduct, deleteProduct, listProducts, listProductsById, updateProduct } from "./logic";
import { ensureProductExistsMiddleware, verifyNameAlreadyExists, verifyUpdatedNameAlreadyExists } from "./middlewares";


const app: Application = express()
app.use(express.json())

app.post('/products',verifyNameAlreadyExists,createProduct )
app.get('/products', listProducts)
app.get('/products/:id',ensureProductExistsMiddleware,listProductsById)
app.delete('/products/:id',ensureProductExistsMiddleware, deleteProduct) 
app.patch('/products/:id',ensureProductExistsMiddleware, verifyUpdatedNameAlreadyExists, updateProduct)

app.listen(3000,() =>{
    console.log('Server is running!')   
})      