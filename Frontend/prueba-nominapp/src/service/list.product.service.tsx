
import Utils from '../utils/utils';
import { Product } from '../model/detail.product.model';

export default class ListProductService {

    private readonly utils = new Utils();
    private readonly nameServer = this.utils.getNameServer();

    getProducts(): Promise<Product[]> {
        return fetch(`${this.nameServer}/productos`, {
            method: 'GET'
        }).then((response) => response.json())
    }
}