import axios from 'axios';
import boom from '@hapi/boom'

export class ProductsService {

  constructor(){
  }

  async getProducts(producto: string) {
    try {
      const url = `https://api.mercadolibre.com/sites/MLA/search?q=​​coca`;
      const { data, status } = await axios.get<any>(
        url,
        {
          headers: {
            Accept: 'application/json',
          },
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
