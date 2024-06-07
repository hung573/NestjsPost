import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";
enum ROLES{
    ADMIN = 'ADMIN',
    MOT = 'MOT',
    USER = 'USER'
}
export class UserDTO{
    @Expose()
    id: number;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    fistname: string;

    @IsNotEmpty()
    lastname: string;

    role: ROLES;

    primission: boolean;
}