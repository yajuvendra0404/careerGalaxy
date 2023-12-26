import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import { injectable } from "tsyringe";
import Config from "../configs/config";
import Routes from '../routes/routes';
import fileUpload from "express-fileupload";
import HttpException from '../exceptions/httpExceptions';
import Models from '@/models/model';

const _fileUpload = fileUpload;

@injectable()
export default class InitializeApp {

  private app: express.Application;
  private MONGODB_CONNECTION_STRING: string;
  private PORT: string;
  private routes: express.IRouter;

  constructor(
    private _config: Config,
    private _routes: Routes,
    // private _models: Models
  ) {

    // ------ config variable initialization
    this.MONGODB_CONNECTION_STRING = this._config.MONGODB_CONNECTION_STRING || "";
    this.PORT = this._config.PORT || "";
    this.routes = this._routes.routes;

    // ------ express initialization
    this.app = express();
    this.app.use(morgan('tiny'));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(_fileUpload({
      limits: { fileSize: 10 * 1024 * 1024 } /* file limit is 10 Mb */
    })) /* middleware for file upload*/

    // ------ init database and routes initialization
    this.initalizeDatabase();
    this.initializeRouter();

    /* Ensures that home planet is always there in the mongoDB.*/
    // this.initializeHomePlanet();

    /* middleware for error handling */
    this.app.use((_error: HttpException, _req: Request, _res: Response, _next: NextFunction) => {
      let message: string = _error.message || "Someting Went Wrong";
      let statusCode: number = _error.statusCode || 500;
      _res.status(statusCode).json({
        error: {
          message: message
        }
      })
    });

  }

  initializeRouter() {
    this.app.use("/", this.routes);
  }

  // async initializeHomePlanet () {
  //   let data = await this._models.Planets.find({});
  //   if(!data[0]) {
  //     let defaultData =  [
  //             {_id:"1703545323396-earth",name:"earth",size: 20.8, position: 0, texture: "./src/uploads/earth.jpg",rotationSpeed: 0.003, orbitingSpeed: 0.01},
  //     ] 
  //     await this._models.Planets.create({...defaultData});
  //   }
  // }

  initalizeDatabase() {
    mongoose.connect("mongodb" + this.MONGODB_CONNECTION_STRING).then(() => {
      this.listen();
      console.log(`------------ Database connection established ------------`);
    }).catch(err => {
      console.log(`--------------- Database connection error ---------------`, err)
    });
  }

  listen() {
    this.app.listen(this.PORT, () => {
      return console.log(`
      ---------------------------------------------
      ---------------------------------------------
      ---------------------------------------------
      Express is listening at http://localhost:${this.PORT}
      ---------------------------------------------
      ---------------------------------------------
      ---------------------------------------------
      `);
    });
  }
}
