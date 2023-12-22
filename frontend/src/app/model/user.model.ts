/* this models hold the data for logged in user. */

export class User {

    constructor (
        private email:string,
        private id:string,
        private _token:string,
        private _tokenExpirationDate:number,
    ) {

    }
    get token() {
        if(!this._tokenExpirationDate || new Date().getTime() > this._tokenExpirationDate) return null;
        return this._token;
    }
}