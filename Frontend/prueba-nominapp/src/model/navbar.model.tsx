import { User } from './login.model';

export interface NavBarInterface {
    moduleSelected: string;
    dataAditional?: any
}

export interface PropsNavBar {
    updateState: any;
    user?: User;
}

export const initialState: NavBarInterface = {
    moduleSelected: 'Products'
}