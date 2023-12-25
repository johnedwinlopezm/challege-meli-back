import axios from 'axios';
import boom from '@hapi/boom'

export class ProductsService {

  constructor(){
  }

  headers = {
    'Content-Type': 'application/json'
  };

  async getProducts(producto: string) {
    try {
      const prod = producto.trim().replace(' ', '%20');
      const url = `http://api.mercadolibre.com/sites/MLA/search?limit=4&q=​​​${prod}`;
      console.log('url encodeuri ' + url);
      const { data, status } = await axios.get<any>(
        url,
        {
          headers : {
            ... this.headers
          }
        },
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return boom.notFound(error.message);
      } else {
        console.log('unexpected error: ', error);
        return boom. notImplemented('An unexpected error occurred');
      }
    }

  }

  async getDescriptionItem(itemId: string){
    try {
      //const url = `https://api.mercadolibre.com/items/MLA1136716168`;
      const url = `https://api.mercadolibre.com/items/​​​${itemId.trim()}`;
      console.log('get item: '+url);
      const { data, status } = await axios.get<any>(
        encodeURI(url),
        {
          headers : {
            ... this.headers
          }
        },
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return boom.notFound(error.message);
      } else {
        console.log('unexpected error: ', error);
        return boom. notImplemented('An unexpected error occurred');
      }
    }
  }
}
