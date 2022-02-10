
import Utils from '../utils/utils';
import { UserLogin, User } from '../model/login.model';

export default class LoginService {

    private readonly utils = new Utils();
    private readonly nameServer = this.utils.getNameServer();

    login(input: UserLogin): Promise<User[]> {
        return fetch(`${this.nameServer}/usuarios?documento=${input.documento}&password=${input.password}`, {
            method: 'GET'
        }).then((response) => response.json())
    }
}