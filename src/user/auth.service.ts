import { BadRequestException, Injectable, Request } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { UserService } from "./user.service";
import { UserDTO } from "src/dto/users/user.dto";
import { LoginDTO } from "src/dto/users/login.dto";

import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService{
    constructor(
        private jwtService: JwtService,
        private userService: UserService) {}
    async registerUser(userdto: UserDTO){
        const checkEmail = await this.userService.findByEmail(userdto.email);
        if(checkEmail){
            throw new BadRequestException('Email already exits!')
        }
        // check & hasd_password & save_database
        const saveUser = await this.userService.create(userdto)
        // generate jwt token
        const payload = {
            id: saveUser.id,
            email: saveUser.email,
            firstname: saveUser.fistname,
            lastname: saveUser.lastname,
            role: saveUser.role
        };
        const accest_token = await this.jwtService.signAsync(payload,{
            secret: process.env.JWT_SECRET,
        })

        return {
            msg: 'User has been created',
            accest_token,
        }
    }
    async loginUser(logindto: LoginDTO){
        const checkEmail = await this.userService.findByEmail(logindto.email);
        if(!checkEmail){
            throw new BadRequestException("Email chua ton tai");
        }
        // check Password
        const checkPassword = await bcrypt.compare(logindto.password, checkEmail.password);
        if(!checkPassword){
            throw new BadRequestException("Password chua dung");
        }
        // check primission
        if(checkEmail.primission == false){
            throw new BadRequestException("Tai khoan da bi khoa");
        }
        // generate jwt token
        const payload = {
            id: checkEmail.id,
            email: checkEmail.email,
            firstname: checkEmail.fistname,
            lastname: checkEmail.lastname,
            role: checkEmail.role
        };
        const accest_token = await this.jwtService.signAsync(payload,{
            secret: process.env.JWT_SECRET,
        })
        return {
            msg: 'User has been login succesfully',
            accest_token,
        }
    }
}