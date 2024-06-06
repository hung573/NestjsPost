import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDTO{
    @Expose()
    id: number;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    primission: boolean;
}