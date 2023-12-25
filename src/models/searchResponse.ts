import { ItemResponse } from "./itemResponse"

export interface SearchResponse {
    author: Author,
    categories: string[],
    items:ItemResponse[]
}

interface Author{
    name:string, 
    lastname:string
}