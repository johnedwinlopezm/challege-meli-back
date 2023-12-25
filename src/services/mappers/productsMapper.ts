import { ItemResponse } from "../../models/itemResponse";
import { Search, Item, Filter } from "../../models/search";
import { SearchResponse } from "../../models/searchResponse";

export class SearchMapper {
    getSearchToResponse(search: Search, name: string, lastname: string): SearchResponse {
        const searchResponse: SearchResponse = {
            author: {
                name: name,
                lastname: lastname
            },
            categories: this.getCategories(search.filters),
            items: this.getResultToItems(search.results)
        }
        return searchResponse;
    }
    getCategories(filters:Filter[]): string[] {
        const categories: string[] = [];
        if(filters && filters.length > 0){
            const category = filters.find( fil => fil.id === 'category');
            if(category && category.values) {
                category.values.forEach( val => {
                    categories.push(... val.path_from_root.map( (path) => { return path.name}));
                });
            }

        }
        return categories;
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


