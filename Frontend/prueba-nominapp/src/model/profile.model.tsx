import { User } from './login.model';

export interface ProfileInterface {
    viewSelected: string;
    textMessage: string;
    typeMessage: string;
}

export interface PropsProfile {
    user?: User;
}

export const initialState: ProfileInterface = {
    viewSelected: 'Body',
    textMessage: '',
    typeMessage: ''
}