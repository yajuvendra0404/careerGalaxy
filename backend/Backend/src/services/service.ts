
import { injectable } from "tsyringe";
import nodemailer from 'nodemailer';
import Config from "../configs/config";
import Models from "../models/model";

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