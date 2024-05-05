/* this models hold the data for logged in user. */

export class User {

    constructor (
        private email:string,
        private user_first_name:string,
        private user_last_name:string,
        private role : string
    ) {
        this.role = role;
        this.email = email;
        this.user_first_name = user_first_name;
        this.user_last_name = user_last_name;
    }


    // setemail (email:string) {
    //   this.email = email;  
    // }
    getemail () {
        return this.email
    }
    setRole( newRole: string ){
        this.role = newRole
    }
    getRole() {
        if(!this.role) return null;
        return this.role;
    }
    // get token() {
    //     if(!this._tokenExpirationDate || new Date().getTime() > this._tokenExpirationDate) return null;
    //     return this._token;
    // }
}