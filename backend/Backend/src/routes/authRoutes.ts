import AuthController from "../controllers/authController";
import { Router } from "express";
import { injectable } from "tsyringe";

@injectable()
export default class AuthRoutes {

    path:string ="/"
    routes = Router();

    constructor(

        _authController: AuthController
    ) {

        this.routes.post(`${this.path}signup`,( req, res, next)=>{
            _authController.signUp(req, res, next);     
        })

    }
}
