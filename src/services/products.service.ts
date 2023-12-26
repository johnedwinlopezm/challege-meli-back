import axios, { AxiosRequestConfig } from 'axios';
import boom from '@hapi/boom'
import { SearchMapper } from './mappers/productsMapper'
import { SearchResponse } from '../models/searchResponse';
import { Description } from '../models/description';
import { ItemD } from '../models/item';
import { ItemDesResponse } from '../models/itemdesResponse';

export class ProductsService {

  mapper = new SearchMapper();
  instance = axios.create();

  configAxios: AxiosRequestConfig = {
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Connection: 'keep-alive',
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
      'Access-Control-Max-Age': '86400',
      'X-Cache':'Miss from cloudfront'
    }
  };

  API_URL = 'https://api.mercadolibre.com';

  constructor() {
  }


  async getProducts(producto: string, name: string = '', lastname: string = ''): Promise<SearchResponse | any> {
    return new Promise((resolve, reject) => {
      let url = `${this.API_URL}/sites/MLA/search?limit=4&q=%producto%`;
      //let url = 'https://api.mercadolibre.com/sites/MLA/search?limit=4&q=%producto%';
      url = url.replace('%producto%', producto);
      this.instance.get<any>(url ,this.configAxios).then(response => {
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
      //let url = 'https://api.mercadolibre.com/sites/MLA/search?limit=4&q=%producto%';
      let url: string = `${this.API_URL}/items/%item%`;
      url = url.replace('%item%', itemId);
      this.instance.get<ItemD>(url, this.configAxios).then(response => { 
        console.log('entro aca' + response.data );
        resolve(response.data);
      }).catch(error => {
        reject(error)
      });
    });
  }

  getDescription(itemId: string): Promise<Description> {
    return new Promise((resolve, reject) => {
      // const url = 'https://api.mercadolibre.com/items/MLA1136716168/description';
      let url: string = `${this.API_URL}/items/%item%/description`;
      url = url.replace('%item%', itemId);
      this.instance.get<Description>(url, this.configAxios).then(response => { 
        console.log('entro aca' + response.data );
        resolve(response.data);
      }).catch(error => {
        reject(error)
      });
    });
  }
}
