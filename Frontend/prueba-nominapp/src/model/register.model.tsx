export interface RegisterInterface {
    viewSelected: string;
    textMessage: string;
    typeMessage: string;
    documento: string;
    password: string;
}

export interface PropsRegister {
    updateState: any;
}

export const initialState: RegisterInterface = {
    viewSelected: 'Body',
    textMessage: '',
    typeMessage: '',
    documento: '',
    password: ''
}