/* this models hold the data for logged in user. */

export class User {

    constructor (
        private email:string,
        private user_first_name:string,
        private user_last_name:string,
        private role:string,
    ) {

    }
    // get token() {
    //     if(!this._tokenExpirationDate || new Date().getTime() > this._tokenExpirationDate) return null;
    //     return this._token;
    // }
}