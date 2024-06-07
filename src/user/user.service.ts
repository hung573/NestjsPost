import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcryptjs';
import { UserDTO } from 'src/dto/users/user.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private userRepo : Repository<UserEntity>,
    ){}

    async create(userdto: UserDTO): Promise<UserDTO>{
        if(userdto.password === '' ){
            throw new NotFoundException(`Password khong duoc de trong`);
        }
        if(userdto.password.length < 6){
            throw new NotFoundException(`Password phai tren 6 ky tu`);
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(userdto.password, salt);
        userdto.password  = hashedPassword;
        return await this.userRepo.save(userdto);
    }    

    async findall():Promise<UserDTO[]>{
        return await this.userRepo.find();
    }

    async findByid(id: number): Promise<UserDTO>{
        console.log(typeof(id));
        const indexCheckid = await this.userRepo.findOneBy({id});
        if(!indexCheckid){
            throw new NotFoundException(`Id User ma ban dang tim: ${id} khong ton tai`);
        }
        return indexCheckid
    }

    async findByEmail (email: string): Promise<UserDTO>{
        return this.userRepo.findOneBy({email});
    }

    async update(id: number, userdto: UserDTO): Promise<UserDTO>{
        const indexCheckid = await this.findByid(id);

        if(indexCheckid){
            await this.userRepo.update(id, userdto);
        }
        return plainToInstance(UserDTO, indexCheckid,{
            excludeExtraneousValues: true
        });
    }

    async delete(id: number): Promise<boolean>{
        const indexCheckid = await this.findByid(id);
        if(indexCheckid){
            await this.userRepo.delete(id);
        }
        return true;
    }
}
