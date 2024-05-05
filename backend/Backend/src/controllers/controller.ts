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
import TokenNotVerifiedException from "@/exceptions/tokenNotVerifiedException";

@injectable()
export default class Controller {
    
    constructor ( 
        private _service: Service
    ) {}

    // ------ test route.
    async testRoute(_req: Request, _res: Response, _next: NextFunction) {

        let testResults = await this._service.checkTransactions();
        console.log(" ----- test results -----", testResults);
        
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

    /*  Get planets data by "Id". if no "Id" exist returns all data. 
     *  And returns an array of JSON <IPlanetData []> ---*/
    async getPlanets (_req: Request, _res: Response, _next: NextFunction) {
        try {
            let data: IPlanetsData[] = await this._service.getPlanets(_req.params.id);
            _res.status(200).json([...data]);
        } catch ( error ) {
            _next(error);
        }
    } 
    
    /* create planets data including the image file for planets' surface. 
     * Returns  { message: "" } , if no exception occur.*/
    async createPlanet (_req: Request, _res: Response, _next: NextFunction) {
        try {
            let data = await this._service.createPlanet( _req.body, _req.files);
            _res.status(200).json(data);
        } catch (error) {
            _next(error);
        }
    }

    /* create planets data including the image file for planets' surface. 
     * Returns  { message: "" } , 
    if no exception occur.*/
    async createLanes (_req : Request, _res: Response, _next: NextFunction) {
        try {
            let data = await this._service.createLanes( _req.body, _req.files);
            _res.status(200).json(data);
        } catch (error) {
            _next(error);
        }
    }
    
    async getLanesByPlanetId (_req: Request, _res: Response, _next: NextFunction){
        try {
            console.log('--- Planet Id ---', _req.params.planetId);

            let data = await this._service.getLanesByPlanetId(_req.params.planetId);
            _res.status(200).json(data);
        } catch (error) {
            _next(error);
        }
    }

    async getLane (_req: Request, _res: Response, _next: NextFunction) {
        try {
            let data = await this._service.getLanes(_req);
            _res.status(200).json(data);

        } catch (error) {
            _next(error);
        }
    };

    async createJobs (_req:Request, _res: Response, _next: NextFunction){
        try {
            let data = await this._service.createJobs(_req.body);
            _res.status(200).json(data);
        } catch(error){
            _next(error);
        }
    }
    
    async getJobsByLaneId (_req:Request, _res: Response, _next: NextFunction) {
        try {
            let data = await this._service.getJobsByLaneId(_req.params.laneId);
            _res.status(200).json(data);
        } catch (error) {
            _next(error);
        }
    }

    async addCertifications (_req:Request, _res: Response, _next: NextFunction) {
        try {
            let data = await this._service.addNewCertifications(_req);
            _res.status(200).json(data);
        } catch (error) {
            _next(error);
        } 
    }

    async addQualifications (_req:Request, _res: Response, _next: NextFunction) {
        try {
            let data = await this._service.addNewQualifications(_req);
            _res.status(200).json(data);
        } catch (error) {
            _next(error);
        } 
    }

    async getQualifications (_req:Request, _res: Response, _next: NextFunction) {
        try {
            let data = await this._service.getQualifications();
            _res.status(200).json(data);
        } catch (error) {
            _next(error);
        } 
    }

    async getCertifications (_req:Request, _res: Response, _next: NextFunction) {
        try {
            let data = await this._service.getCertifications();
            _res.status(200).json(data);
        } catch (error) {
            _next(error);
        } 
    }

    async signUp (_req: Request, _res: Response, _next: NextFunction): Promise<void>  {
        try {

            const userData: IUser  = _req.body;
            const { cookie, createdUserData } = await this._service.signup(userData);
            _res.setHeader('Set-Cookie', [cookie]);
            _res.status(201).json({ data: createdUserData, message: 'Signup Completed.' });
          
            //  _res.status(201).json({ data: "data", message: 'signup' });
        } catch (error) {
            _next(error);
        }
    };

    public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        console.log("--- inside login controller ---")
        try {
          const userData = req.body;
          const { cookie, findUser } = await this._service.login(userData);
    
          res.setHeader('Set-Cookie', [cookie]);
          res.status(200).json({ data: findUser, message: 'login' });
        }
        // On HttpException add cookie header to response
        catch (error) {
          if (error instanceof TokenNotVerifiedException) {
            res.setHeader('Set-Cookie', [error.cookie]);
            next(error);
          } else {
            next(error);
          }
        }
      };
    
      //Logout method to logout a user
    //   public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    //     try {
    //       const userData: User = req.user;
    //       const logOutUserData: User = await this.authService.logout(userData);
    
    //       res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
    //       res.status(200).json({ data: logOutUserData, message: 'logout' });
    //     } catch (error) {
    //       next(error);
    //     }
    //   };
}   
