export interface Item {
    id: String,
    title: String,
    price: Price,
    picture: String,
    condition: String,
    free_shipping: Boolean
}

export interface Price {
    currency: String,
    amount: Number,
    decimals: Number
}
