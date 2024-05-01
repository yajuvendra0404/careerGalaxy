import mongoose from 'mongoose';
import { injectable } from 'tsyringe';
import { ISkill } from'../interfaces/common.interface';
@injectable()
export default class Models {
    
    Message = mongoose.model("message", new mongoose.Schema({
        message:{ type:String, required: true, trim: true },
        subject:{ type:String, required: true, trim: true },
        emailId:{ type:String, required: true, trim: true },
        isVerified:{ type:Boolean, trim:true, required:true },
    }))

    OTP = mongoose.model ("OTP", new mongoose.Schema({
        emailId:{ type:String, required: true, trim: true },
        OTP:{ type:Number, trim:true, required:true },
        expiresAt: { type: Date, required: true, index: true, expires:'1m'},  
    }))

    Planet = mongoose.model ("planet", new mongoose.Schema({
        _id:{ type:String, required: true, trim: true },
        name:{ type:String, required: true, trim: true },
        size:{ type: Number, trim:true, required:true },
        position: { type: Number, required: true },  
        rotationSpeed: { type: Number, required: true },  
        orbitingSpeed: { type: Number, required: true },  
        texture: { type: String, required: true},
        // lanes: { type: [String], required: true}
    }))

    Lane = mongoose.model ("lane", new mongoose.Schema({
        _id:{ type:String, required: true, trim: true },
        laneName:{ type:String, required: true, trim: true },
        laneImage : { type:String, require: true, trim: true },
        planetId: {
            type:String,
            ref:'Planet' 
        }
        // lanes: { type: [String], required: true}
    }))
    
    Job = mongoose.model("job", new mongoose.Schema({
        _id: {type:String, required:true, trim: true},
        title: {type:String, required:true, trim: true},
        description: {type:String, required:true, trim: true},
        salary: {type:String, required:true, trim: true},
        qualification: {type:[String], required:true, trim: true},
        skills: {type:[
            { skillName: String, skillLevel: Number }
        ], required:true},
        lane: {
            type:String,
            ref:'Lane'
        }, 
        certification: {type:[String], required:true, trim: true},
        responsibilites: {type:String, required:true, trim: true},
        experience : {type:Number, required:true, trim: true},
        levelOfPrep: {type:Number, required:true, trim: true},
    }))
    
    Certification = mongoose.model("certification", new mongoose.Schema({
        _id: {type:String, required:true, trim: true},
        name: {type:String, required:true, trim: true},
    }))

    Qualification = mongoose.model("qualification", new mongoose.Schema({
        _id: {type:String, required:true, trim: true},
        name: {type:String, required:true, trim: true},
    }))
    
    /* for testing "Transactions" in mongoDB  */
    User = mongoose.model ('user', new mongoose.Schema({
        data1 : { type:String, required: true, trim: true },
        data2 : { type:String, required: true, trim: true },
    }))

    Post = mongoose.model ('post', new mongoose.Schema({
        dataX : { type:String, required: true, trim: true },
        dataY : { type:String, required: true, trim: true },
    }))
    
}

