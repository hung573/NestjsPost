import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { Transform } from "class-transformer";

@Entity('post')
export class PostEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    @CreateDateColumn()
    createAt: Date;
    @Column()
    @UpdateDateColumn()
    updateAt: Date;

    @ManyToOne(()=> UserEntity, (user) => user.posts,{ eager: true })
    @Transform(({obj}) => obj.user.id)
    user: UserEntity;
}
