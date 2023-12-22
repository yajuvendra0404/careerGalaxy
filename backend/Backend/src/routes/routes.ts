import Controller from "../controllers/controller";
import { Router } from "express";
import { injectable } from "tsyringe";

@injectable()
export default class Routes {
    path:string ="/"
    routes = Router();

    constructor(
        _controller: Controller
        ) {
        this.routes.get(`${this.path}greet`, ( req, res, next)=>{
            _controller.testRoute(req, res, next);       
        })
        this.routes.post(`${this.path}submitMessage`, ( req, res, next)=>{
            _controller.submitMessage(req, res, next);     
        })
        this.routes.post(`${this.path}generateOTP`,(req, res, next)=> {
            _controller.generateOTP(req, res, next);
        })
    }
}