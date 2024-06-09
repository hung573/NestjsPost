import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from 'class-transformer';
import { PostEntity } from "./post.entity";

export enum ROLES{
    ADMIN = 'ADMIN',
    MOT = 'MOT',
    USER = 'USER'
}
@Entity('user')
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    fistname: string;

    @Column()
    lastname: string;

    @Column({
        default: ROLES.USER
    })
    @Exclude()
    role: ROLES;

    @Column({
        default: true
    })
    primission: boolean;
    
    @OneToMany(()=> PostEntity, (posts)=> posts.user)
    posts: PostEntity[];
}