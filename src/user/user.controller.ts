import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from 'src/dto/user.dto';
import { UserEntity } from 'src/entity/user.entity';
import { query } from 'express';

@Controller('/users')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ){}

    @Post()
    CreateUser(@Body() userdto: UserDTO): Promise<UserDTO>{
        return  this.userService.create(userdto);
    }

    @Get()
    FindAll(): Promise<UserDTO[]>{
        return  this.userService.findall();
    }

    @Get(':id')
    FindById(@Param('id',ParseIntPipe) id: number): Promise<UserDTO>{
        console.log(typeof(id));
        return  this.userService.findByid(id);
    }

    // @Get("a")
    // FindByName(@Query() query): Promise<UserDTO>{
    //     return  this.userService.findByEmail(query.email);
    // }

    @Put(':id')
    Update(@Param('id',ParseIntPipe) id: number, @Body() userdto: UserDTO): Promise<UserDTO>{
        return this.userService.update(id,userdto);
    }

    @Delete(':id')
    Delete(@Param('id',ParseIntPipe) id: number): Promise<boolean>{
        return this.userService.delete(id);
    }
}
