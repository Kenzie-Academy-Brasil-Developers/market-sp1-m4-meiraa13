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


export { IProduct, ICleaningProduct, IFoodProduct, IMarket }
