import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";
import { ROLES } from "src/entity/user.entity";

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