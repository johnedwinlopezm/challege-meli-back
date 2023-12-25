export interface Search {
    site_id: string,
    country_default_time_zone: string,
    query: string,
    paging: Paging,
    results: Item[],
    filters: Filter[]
}

interface Paging {
    total: number,
    primary_results: number,
    offset: number,
    limit: number
}

export interface Item {
    id: string,
    title: string,
    condition: string,
    thumbnail_id: string,
    catalog_product_id: string,
    listing_type_id: string,
    permalink: string,
    buying_mode: string,
    site_id: string,
    category_id: string,
    domain_id: string,
    thumbnail: string,
    currency_id: string,
    order_backend: number,
    price: number,
    original_price: number,
    sale_price: number,
    available_quantity: number,
    official_store_id: number,
    official_store_name: string,
    use_thumbnail_id: boolean,
    accepts_mercadopago: boolean,
    shipping: Shipping,
    stop_time: string,
    seller: Seller,
    attributes: Attribute[],
    installments: any,
    winner_item_id: any,
    catalog_listing: boolean,
    discounts: any,
    promotions: any[],
    inventory_id: any
}

interface Shipping {
    store_pick_up: boolean,
    free_shipping: boolean,
    logistic_type: string,
    mode: string,
    tags: string[],
    benefits: any,
    promise: any
}

interface Seller {
    id: number,
    nickname: string
}

interface Attribute {
    id: string,
    name: string,
    value_id: string,
    value_name: string,
    attribute_group_id: string,
    attribute_group_name: string,
    value_struct: string,
    values: any[],
    source: number,
    value_type: string
}

export interface Filter {
    id: string,
    name: string,
    type: string,
    values: Value[]
}

export interface Value {
    id: string,
    name: string,
    path_from_root: Path[]
}

export interface Path {
    id: string,
    name: string
}