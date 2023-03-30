interface IProduct {
    id:number,
    name:string,
    price:number,
    weight:number,
    section: 'food' | 'cleaning',
    expirationDate:Date
}

interface ICleaningProduct extends IProduct{}

interface IFoodProduct extends IProduct{
    calories:number
}

interface IMarket {
    total:number,
    marketProducts:Array<ICleaningProduct | IFoodProduct>
}

type TProductRequest = Omit<IProduct, 'id' | 'expirationDate'>

export { IProduct, ICleaningProduct, IFoodProduct, TProductRequest, IMarket }