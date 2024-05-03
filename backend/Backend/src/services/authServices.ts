
import { injectable } from "tsyringe";
import nodemailer from 'nodemailer';
import Config from "../configs/config";
import Models from "../models/model";
import mongoose from 'mongoose';
import HttpException from "@/exceptions/httpExceptions";
import { IUserData,  ITokenData, IUser} from "@/interfaces/common.interface";
import { Request } from "express";
import * as fs from 'fs';
import { isEmpty } from "@/utils/utils";
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken'

@injectable()
export class AuthService {

    constructor(
        private _config : Config,
        private _models : Models
    ) {}

    async signup(userData: IUserData): Promise<{ cookie: string; createdUserData: IUserData }> {
        if (isEmpty(userData)) throw new HttpException(400, "userData is empty");
        
        const findUser = await this._models.User.findOne({ where: { email: userData.user_email } });
        if (findUser) throw new HttpException(409, `This email ${userData.user_email} already exists`);
   
        
        const hashedPassword = await hash(userData.user_password, 10);
        
        let security_code = Math.floor(100000 + Math.random() * 900000);

        const createdUserData:IUser = await this._models.User.create({ ...userData, user_activation_code: security_code, user_password: hashedPassword, ...location });
        // MailService.getInstance().sendMail(createdUserData);
        const tokenData = this.createToken(createdUserData, userData.user_role);
        const cookie = this.createCookie(tokenData);

        // createdUserData.user_password = "";
        // createdUserData.user_activation_code= undefined;

        return { cookie, createdUserData };
    }
    

    public createToken(user: IUser, user_role: string): ITokenData {
        const dataStoredInToken = { user_id: user._id, user_role };
        const secretKey: string = this._config.SECRET_KEY as string;
        const expiresIn: number = 60 * 60;
    
        return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
    }

    public createCookie(tokenData: ITokenData): string {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    }
    

}

