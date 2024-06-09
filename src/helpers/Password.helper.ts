import { NotFoundException } from "@nestjs/common";
import { UserDTO } from "src/dto/users/user.dto";
import * as bcrypt from 'bcryptjs';

export class Password{
    static async check_PassWord(userdto: UserDTO){
        if(userdto.password === '' ){
            throw new NotFoundException(`Password khong duoc de trong`);
        }
        if(userdto.password.length < 6){
            throw new NotFoundException(`Password phai tren 6 ky tu`);
        }
    }
    static async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
}