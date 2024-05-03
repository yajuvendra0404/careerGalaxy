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
import { IPlanetsData, IUser } from "@/interfaces/common.interface";
import { AuthService } from "../services/authServices";

@injectable()
export default class AuthController {
    
    constructor ( 
        private _authService: AuthService
    ) {}
    async signUp (_req: Request, _res: Response, _next: NextFunction): Promise<void>  {
        try {
          const userData: IUser  = _req.body;
          console.log("--- userData ---", userData);

        //   const { cookie, createdUserData } = await this._authService.signup(userData);
        //   _res.setHeader('Set-Cookie', [cookie]);
        //   _res.status(201).json({ data: createdUserData, message: 'signup' });
          
          _res.status(201).json({ data: "data", message: 'signup' });
        } catch (error) {
          _next(error);
        }
    };

}   
