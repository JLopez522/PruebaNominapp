
import { Product } from './detail.product.model';

export interface ListProductInterface {
    viewSelected: string;
    textMessage: string;
    typeMessage: string;
    dataProducts?: Product[]
}

export interface PropsListProduct {
    updateState: any
}

export const initialState: ListProductInterface = {
    viewSelected: 'Body',
    textMessage: '',
    typeMessage: ''
}