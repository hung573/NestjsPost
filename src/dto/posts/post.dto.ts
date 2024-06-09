import { Expose } from "class-transformer";
import { IsNotEmpty, Length, MaxLength } from "class-validator";
import { UserEntity } from "src/entity/user.entity";

export class PostDTO{
    @Expose()
    id: number;

    @IsNotEmpty()
    @Length(4,40)
    title: string;

    @MaxLength(50,{
        message:"description khong qua 50",
    })
    description: string;
    user: UserEntity;
}