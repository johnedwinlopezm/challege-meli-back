export interface ItemD {
    id: string,
    site_id: string,
    title: string,
    pictures: Picture[],
    shipping: Shipping,
    condition: string,
    price: number,
    currency_id: string,
    initial_quantity: number
    
}

export interface Picture {
    id: string,
    url: string,
    secure_url: string,
    size: string,
    max_size: string,
    quality: string
}

interface Shipping {
    store_pick_up: boolean,
    free_shipping: boolean,
    logistic_type: string,
    mode: string,
    tags: string[],
}