
import Utils from '../utils/utils';
import { Product } from '../model/detail.product.model';

export default class DetailProductService {

    private readonly utils = new Utils();
    private readonly nameServer = this.utils.getNameServer();

    getProduct(id?: number): Promise<Product> {
        return fetch(`${this.nameServer}/productos/${id}`, {
            method: 'GET'
        }).then((response) => response.json())
    }

    insertProduct(input: Product): Promise<Product> {
        return fetch(`${this.nameServer}/productos`, {
            method: 'POST',
            body: JSON.stringify(input),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json())
    }

    updateProduct(input: Product): Promise<Product> {
        return fetch(`${this.nameServer}/productos/${input.id}`, {
            method: 'PUT',
            body: JSON.stringify(input),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json())
    }

    deleteProduct(input: Product): Promise<Product> {
        return fetch(`${this.nameServer}/productos/${input.id}`, {
            method: 'DELETE'
        }).then((response) => response.json())
    }
}