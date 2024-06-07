import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";
enum ROLES{
    ADMIN = 'ADMIN',
    MOT = 'MOT',
    USER = 'USER'
}
export class LoginDTO{

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    // role: ROLES;
}