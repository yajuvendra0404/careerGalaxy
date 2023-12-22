/*  
    create vs save method - create method is used to 
    create new document while save method is use 
    to update already existing document.
    and in case of updating the doument it is 
    better to use updateOne() over save() because of atomicity 
*/

import { injectable } from "tsyringe";
import { NextFunction,Request, Response } from "express";
import { Service } from "../services/service";

@injectable()
export default class Controller {
    
    constructor ( 
        private _service: Service
    ) {}

    // ------ test route.
    testRoute(_req: Request, _res: Response, _next: NextFunction) {
        console.log()
        _res.status(200).json({ title: 'Test Complete.' }); 
    }

    // ------ save message after OTP verification.
    async submitMessage(_req: Request, _res: Response, _next: NextFunction) {
        try {
            var json = await this._service.submitMessage(_req.body);
            _res.status(200).json(json) 
        } catch(exp) {
            console.log("exception occured");
        }
    }

    // ------ send mail for OTP verification.
    async generateOTP(_req: Request, _res: Response, _next: NextFunction) {
        let mailSent = await this._service.sendMail(_req.body.emailId);
        _res.status(200).json(mailSent);
    }
}