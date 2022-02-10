
import { User } from '../model/login.model';

export interface InitiationInterface {
    moduleSelected: string;
    user?: User;
}

export interface NoProps {
}

export const initialState: InitiationInterface = {
    moduleSelected: 'Login'
}