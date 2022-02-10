
import Utils from '../utils/utils';
import { User } from '../model/login.model';

export default class RegisterService {

    private readonly utils = new Utils();
    private readonly nameServer = this.utils.getNameServer();

    userExits(documento: string): Promise<User[]> {
        return fetch(`${this.nameServer}/usuarios?documento=${documento}`, {
            method: 'GET'
        }).then((response) => response.json())
    }

    insertUser(input: User): Promise<User> {
        return fetch(`${this.nameServer}/usuarios`, {
            method: 'POST',
            body: JSON.stringify(input),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json())
    }
}