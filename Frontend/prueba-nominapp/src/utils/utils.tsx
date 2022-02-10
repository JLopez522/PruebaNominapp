

export default class Utils {

    private readonly nameServer: string = 'http://localhost:3001';

    getNameServer(): string {
        return this.nameServer;
    }
}