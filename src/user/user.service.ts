import { BadRequestException, Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcryptjs';
import { UserDTO } from 'src/dto/users/user.dto';
import { checkPermission } from 'src/helpers/checkPermissiom.helper';
import { Password } from 'src/helpers/Password.helper';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private userRepo : Repository<UserEntity>,
    ){}

    async create(userdto: UserDTO): Promise<UserDTO>{
        Password.check_PassWord(userdto)
        userdto.password  = await Password.hashPassword(userdto.password);
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

    async update(id: number, userdto: UserDTO, currentUser: UserEntity): Promise<UserDTO>{
        const indexCheckid = await this.findByid(id);
        if(!indexCheckid){
            throw new NotFoundException(`id user khong ton tai`);
        }
        if(userdto.role){
            throw new BadRequestException('ban khong duoc update role')
        }
        // check xem co dung id nguoi dung chua
        checkPermission.checkUserUpdate(id, currentUser);
        // check xem password co dung yeu cau chua
        Password.check_PassWord(userdto)
        // ma hoa password
        userdto.password  = await Password.hashPassword(userdto.password);
        await this.userRepo.update(id, userdto);
        return plainToInstance(UserDTO, indexCheckid,{
            excludeExtraneousValues: true
        });
    }

    async delete(id: number, currentUser: UserEntity): Promise<boolean>{
        const indexCheckid = await this.findByid(id);
        if(indexCheckid){
            checkPermission.checkUserDelete(id,currentUser);
            await this.userRepo.delete(id);
        }
        return true;
    }
}
