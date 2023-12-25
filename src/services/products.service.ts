import axios from 'axios';
import boom from '@hapi/boom'
import { SearchMapper } from './mappers/productsMapper'
import { SearchResponse } from '../models/searchResponse';
import { Description } from '../models/description';
import { ItemD } from '../models/item';
import { ItemDesResponse } from '../models/itemdesResponse';

export class ProductsService {

  mapper = new SearchMapper();
  instance = axios.create();

  headers = {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*"
  };

  API_URL = "http://api.mercadolibre.com";

  constructor() {
  }


  async getProducts(producto: string, name: string = '', lastname: string = ''): Promise<SearchResponse | any> {
    return new Promise((resolve, reject) => {
      const prod = producto.trim().replace(' ', '%20');
      const url = `${this.API_URL}/sites/MLA/search?limit=4&q=​​​${prod}`;
      console.log('url consumo: ' + url);
      this.instance.get<any>(url ,{ headers: this.headers}).then(response => {
        resolve(this.mapper.getSearchToResponse(response.data, name, lastname))
      }).catch(error => {
        if (axios.isAxiosError(error)) {
          console.log('error message: ', error.message);
          reject(boom.notFound(error.message));
        } else {
          console.log('unexpected error: ', error);
          reject(boom.notImplemented('An unexpected error occurred'));
        }
      });
    });

  }

  async getDescriptionItem(itemId: string, name: string = '', lastname: string = ''): Promise<ItemDesResponse> {
    return new Promise((resolve, reject) => {
      Promise.all([this.getItem(itemId), this.getDescription(itemId)]).then( response => {
        const item = response[0];
        const description = response[1];
        resolve(this.mapper.getItemToItemResponse(item, description ,name, lastname))
      }).catch( error => {
        reject(boom.notFound(error.message));
      });
    })
  }

  getItem(itemId: string): Promise<ItemD> {
    return new Promise((resolve, reject) => {
      // const url = "https://api.mercadolibre.com/items/MLA1136716168";
      const url: string = `${this.API_URL}/items/​​​${itemId}`;
      console.log('get item: ' + url);
      this.instance.get<ItemD>(url, { headers: this.headers}).then(response => { 
        resolve(response.data);
      }).catch(error => {
        reject(error)
      });
    });
  }

  getDescription(itemId: string): Promise<Description> {
    return new Promise((resolve, reject) => {
      // const url = "https://api.mercadolibre.com/items/MLA1136716168/description";
      const url: string = `${this.API_URL}/items/​​​${itemId}/description`;
      console.log('get item: ' + url);
      this.instance.get<Description>(url, { headers: this.headers}).then(response => { 
        resolve(response.data);
      }).catch(error => {
        reject(error)
      });
    });
  }
}
