export class LocalStorageService {

    private static readonly _userAccountInfo = "_userAccount";

    static set userAccount(userData: any) {
        localStorage.setItem(this._userAccountInfo, JSON.stringify(userData));
    }

    static get userAccount(): any {
        return JSON.parse(localStorage.getItem(this._userAccountInfo));
    }

    static removeUserAccount() {
        localStorage.removeItem(this._userAccountInfo);
    }


    static clearAll(): void {
        localStorage.removeItem(this._userAccountInfo);
    }

}