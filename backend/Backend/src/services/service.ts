
import { injectable } from "tsyringe";
import nodemailer from 'nodemailer';
import Config from "../configs/config";
import Models from "../models/model";
import mongoose from 'mongoose';
import HttpException from "@/exceptions/httpExceptions";
import { IPlanetsData } from "@/interfaces/common.interface";


@injectable()
export class Service {
    private generatedOTP:number;
    
    constructor(
        private _config : Config,
        private _models : Models
    ) {}

    async sendMail(emailId: string): Promise<{[key:string]:string} > {
        try {
            if( !emailId ) return { message: "Please Enter A Valid Email Id."}; 
            let transporter = nodemailer.createTransport({
                host: this._config.SMTP_HOST,
                port: 587,
                secure: false, 
                auth: {
                    user: this._config.SMTP_USERNAME,
                    pass: this._config.SMTP_PASSWORD
                },
            });
            await transporter.sendMail({
                from: '"m04.portfolio.04" <m04.portfolio.04@gmail.com>',
                to: emailId,
                subject: "Email Verification OTP",
                html: this.getTemplate(),
            }, async (error, info) => {
                if (error) throw ("Error occured verification OTP was not Send.");
                
                await this._models.OTP.create({
                    "emailId":emailId, 
                    "OTP":this.generatedOTP,
                    "expiresAt": new Date(Date.now() + 60)
                });
                console.log("---mailer - info---",info)
            });
            return {'message':'Verification OTP Send'};  
            
        } catch (exp) {
            return {"error":exp};
        }
    }
    async submitMessage (_body: any): Promise<{[key:string]:string }> {

        try{
            if( !_body.emailId ) return { message: "Please Enter A Valid Email Id."}; 
            if( !_body.message ) return { message: "Please Enter Message."}; 
            if( !_body.subject ) return { message: "Please Enter Subject."}; 
            if( !_body.OTP ) return { message: "Please Enter OTP."};

            let data = await this._models.OTP.findOne({emailId: _body.emailId});
            if( data?.OTP != _body.OTP ) return { message: "Invalid OTP."}; 

            await this._models.Message.create({..._body,isVerified:true});  
            return { message: "Message has been delivered."};
            
        } catch (exp) {
            return { error: exp};
        }

    }
    async createPlanet (_body: any, file: any): Promise<{[key:string]:string }> {
        
            let error: string = "";
            let fileName : string = file.texture.name;
            
            /* loop through all the properties to check if none of them is empty. */
            for(let key in _body){
                if( !_body.hasOwnProperty(key) || _body[key] == null || _body[key] == "null" || _body[key] == ""  ) 
                    error = key;
            }

            /* throw exception if any of the property is empty */
            if( error) throw new HttpException(400,`Please enter for ${error} the planet.`);

            /* if image for the planet's surface is not uploaded*/
            if( !fileName ) throw new HttpException(400,`Please upload planet surface image.`)
            
            /* move the file to uploads folder. */
            file.texture.mv( "src/" + this._config.UPLOAD_PATH + fileName);
            
            /* check if the planet's name already exist */
            let data = await this._models.Planets.findOne({name: _body.name});
            if ( data?.name == _body.name ) throw new HttpException(409, "Planet name already exists.");

            /* create custom "_id", set file path to "texture key" and save the data */
            _body._id = new Date().getTime() +"-"+ _body.name;
            _body.texture = this._config.UPLOAD_PATH + fileName;
            _body.lanes = JSON.parse(_body.lanes);

            await this._models.Planets.create({..._body});  

            return { message: "Data saved."};

    }

    async getPlanets ( id: string = "" ): Promise<IPlanetsData[]> {

        let filter = {};
        filter = ( id == "" || id == null || id =="null" ) ? {} : { "_id": id };

        let data: IPlanetsData[] = await this._models.Planets.find(filter);

        if(!data[0]) throw new HttpException( 404 , 'Planet data not found' );


        return data;
    }

    async checkTransactions () : Promise<any> {
        let session = await mongoose.startSession();
        try {
            session.startTransaction();
            const user = await this._models.User.create ([
                {
                    data1: "data1",
                    data2: "data2"
                }
            ], {session});

            const planet = await this._models.Post.create ([
                {
                    dataX: "dataX",
                    dataY: "dataY"
                }
            ], {session});
            
            await session.commitTransaction();
            // session.endSession(); // Make sure
        } catch (exp) {
            await session.abortTransaction();
            // session.endSession(); // Make sure to end the session after aborting
            throw exp; // Re-thro
        }
        return {message : "transcation completed"};
    }

    private getTemplate(): string {
        this.generatedOTP = parseInt((Math.random()*1000000).toFixed(0));

        let template:string ="";

        template += "<html>"; 
        template += "Dear User, <br><br>" ;
        template += "Verification OTP - "+ this.generatedOTP ;
        template += "<br> This OTP expires in 60 seconds.";
        template += "<br><br> Thank you.";
        template += "</html>";

        return template;
    }

}

// User = mongoose.model ('user', new mongoose.Schema({
//     data1 : { type:String, required: true, trim: true },
//     data2 : { type:String, required: true, trim: true },
// }))


// Post = mongoose.model ('post', new mongoose.Schema({
//     dataX : { type:String, required: true, trim: true },
//     dataY : { type:String, required: true, trim: true },
// }))
