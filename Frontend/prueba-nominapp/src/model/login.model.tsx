
export interface LoginInterface {
    viewSelected: string;
    textMessage: string;
    typeMessage: string;
    documento: string;
    password: string;
}

export interface PropsLogin {
    updateState: any;
}

export const initialState: LoginInterface = {
    viewSelected: 'Body',
    textMessage: '',
    typeMessage: '',
    documento: '',
    password: ''
}

export interface User {
    id?: number;
    documento: string;
    password: string;
}

export interface UserLogin {
    documento: string;
    password: string;
}