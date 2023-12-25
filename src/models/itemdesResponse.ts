export interface ItemDesResponse {
    author: Author,
    item: ItemDes,
}

interface ItemDes{
    id: string,
    title: string,
    price: Price,
    picture: string,
    condition: string,
    free_shipping: boolean,
    sold_quantity: number,
    description: string
}

interface Author{
    name:string, 
    lastname:string
}

interface Price {
    currency: string,
    amount: number,
    decimals: number
}