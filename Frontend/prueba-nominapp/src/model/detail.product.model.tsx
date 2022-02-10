


export interface DetailProductInterface {
    viewSelected: string;
    textMessage: string;
    typeMessage: string;
    id?: number,
    codigo: string,
    descripcion: string,
    inventario: number,
    precio: number
}

export interface PropsDetailProduct {
    updateState: any;
    dataAditional: DataAditional
}

export interface DataAditional {
    operation: string;
    idProduct?: number;
}

export const initialState: DetailProductInterface = {
    viewSelected: 'Body',
    textMessage: '',
    typeMessage: '',
    codigo: '',
    descripcion: '',
    inventario: 0,
    precio: 0
}

export interface Product {
    id?: number,
    codigo: string,
    descripcion: string,
    inventario: number,
    precio: number
}