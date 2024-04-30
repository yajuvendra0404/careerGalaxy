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
        this.routes.get(`${this.path}test`, ( req, res, next)=>{
            _controller.testRoute(req, res, next);       
        })
        this.routes.post(`${this.path}submitMessage`, ( req, res, next)=>{
            _controller.submitMessage(req, res, next);     
        })
        this.routes.post(`${this.path}generateOTP`,( req, res, next)=> {
            _controller.generateOTP(req, res, next);
        })
        this.routes.get(`${this.path}planets/:id?`,( req, res, next)=>{
            _controller.getPlanets(req, res, next);       
        })
        this.routes.post(`${this.path}planet`,( req, res, next)=>{
            _controller.createPlanet(req, res, next);     
        })
        this.routes.get(`${this.path}lanes`,( req, res, next)=>{
            _controller.getLane(req, res, next);       
        })
        this.routes.post(`${this.path}lanes`,( req, res, next)=>{
            _controller.createLanes(req, res, next);     
        })
        this.routes.get(`${this.path}lanesByPlanetId/:planetId`,( req, res, next)=>{
            _controller.getLanesByPlanetId( req, res, next);     
        })
        this.routes.post(`${this.path}jobs`, ( req, res, next)=>{
            _controller.createJobs(req,res,next);
        })
        this.routes.get(`${this.path}jobsByLaneId/:laneId`, ( req, res, next)=> {
            _controller.getJobsByLaneId(req,res,next);
        })


        /* Get list of qualifications in the database, 
           no parameter should be passed*/
        this.routes.get(`${this.path}certificate`, ( req, res, next)=> {
            _controller.getCertifications(req,res,next);
        })

        /* Get list of certifiactions in the database, 
           no parameter should be passed*/

        this.routes.get(`${this.path}qualification`, ( req, res, next)=> {
            _controller.getQualifications(req,res,next);
        })


        this.routes.post(`${this.path}certificate`,( req, res, next)=>{
            _controller.addCertifications(req, res, next);     
        })
        this.routes.post(`${this.path}qualification`,( req, res, next)=>{
            _controller.addQualifications(req, res, next);     
        })


    }
}
