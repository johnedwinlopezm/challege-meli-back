import { ItemResponse } from "../../models/itemResponse";
import { Search, Item } from "../../models/search";
import { SearchResponse } from "../../models/searchResponse";

export class SearchMapper {
    getSearchToResponse(search: Search): SearchResponse {
        const searchResponse: SearchResponse = {
            author: {
                name: '',
                lastname: ''
            },
            categories: [],
            items: this.getResultToItems(search.results)
        }
        return searchResponse;
    }

    getResultToItems(results: Item[]): ItemResponse[] {
        const items:ItemResponse[] = [];
        if(results && results.length > 0) {
            results.forEach( result => {
                const item: ItemResponse = {
                    title: result.title,
                    id: result.id,
                    picture : result.thumbnail,
                    free_shipping : result.shipping?.free_shipping,
                    condition: result.condition,
                    price: {
                        amount: result.price,
                        currency: result.currency_id,
                        decimals: result.original_price
                    }
                }
                items.push(item);
            });
        }
        return items;
    }
}


