import mongoose from 'mongoose';
import { injectable } from 'tsyringe';
@injectable()
export default class Models {
    
    Message = mongoose.model("message", new mongoose.Schema({
        message:{ type:String, required: true, trim: true },
        subject:{ type:String, required: true, trim: true },
        emailId:{ type:String, required: true, trim: true },
        isVerified:{ type:Boolean, trim:true, required:true},
    }))

    OTP = mongoose.model ("OTP", new mongoose.Schema({
        emailId:{ type:String, required: true, trim: true },
        OTP:{ type:Number, trim:true, required:true},
        expiresAt: { type: Date, required: true, index: true, expires:'1m'},  
    }))
    Planets = mongoose.model ("planet", new mongoose.Schema({

        name:{ type:String, required: true, trim: true },
        size:{ type:String, trim:true, required:true },
        position: { type: String, required: true },  
        rotationSpeed: { type: String, required: true },  
        orbitingSpeed: { type: String, required: true },  
        texture: { type: String, required: true},
    }))
    
}
