import { injectable } from "tsyringe";

@injectable()
export default class TokenNotVerifiedException extends Error{
    public statusCode: number;
    public message: string;
    public cookie: string;

    constructor ( statusCode: number,  message: string, cookie: string) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.cookie = cookie;
    }
}