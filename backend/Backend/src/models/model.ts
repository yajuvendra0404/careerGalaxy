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
        _id:{ type:String, required: true, trim: true },
        name:{ type:String, required: true, trim: true },
        size:{ type: Number, trim:true, required:true },
        position: { type: Number, required: true },  
        rotationSpeed: { type: Number, required: true },  
        orbitingSpeed: { type: Number, required: true },  
        texture: { type: String, required: true},
        lanes: { type: [String], required: true}
    }))
    
    
    User = mongoose.model ('user', new mongoose.Schema({
        data1 : { type:String, required: true, trim: true },
        data2 : { type:String, required: true, trim: true },
    }))


    Post = mongoose.model ('post', new mongoose.Schema({
        dataX : { type:String, required: true, trim: true },
        dataY : { type:String, required: true, trim: true },
    }))
}

