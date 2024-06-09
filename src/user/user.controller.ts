import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { query } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserDTO } from 'src/dto/users/user.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from 'src/dto/users/login.dto';
import { CurrentUser } from './decorator/currentUser.decorator';
import { UserEntity } from 'src/entity/user.entity';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('/api/user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ){}

    // @Post()
    // CreateUser(@Body() userdto: UserDTO): Promise<UserDTO>{
    //     return  this.userService.create(userdto);
    // }

    @Get()
    @UseGuards(new RoleGuard(['admin','mod'])) // duoc thuc hien sau
    @UseGuards(AuthGuard) // duoc thuc hien truoc
    FindAll(): Promise<UserDTO[]>{
        return  this.userService.findall();
    }

    @Get('current-use')
    @UseGuards(AuthGuard)
    GetCurrentUser(@CurrentUser() currentUser: UserEntity){
        return currentUser;
    }

    @Get(':id')
    @UseGuards(new RoleGuard(['admin','mod']))
    @UseGuards(AuthGuard)
    FindById(@Param('id',ParseIntPipe) id: number): Promise<UserDTO>{
        return  this.userService.findByid(id);
    }

    @Put(':id')
    @UseGuards(new RoleGuard(['admin','user','mod'])) // duoc thuc hien sau
    @UseGuards(AuthGuard)
    Update(@Param('id',ParseIntPipe) id: number, @Body() userdto: UserDTO,@CurrentUser() currentUser: UserEntity): Promise<UserDTO>{
        return this.userService.update(id,userdto,currentUser);
    }

    @Delete(':id')
    @UseGuards(new RoleGuard(['admin','user','mod'])) // duoc thuc hien sau
    @UseGuards(AuthGuard)
    Delete(@Param('id',ParseIntPipe) id: number, @CurrentUser() currentUser: UserEntity): Promise<boolean>{
        return this.userService.delete(id,currentUser);
    }

    @Post('register')
    registerUser(@Body() userdto: UserDTO){
        return this.authService.registerUser(userdto);
    }

    @Post('login')
    login(@Body() logindto: LoginDTO){
        return this.authService.loginUser(logindto);
    }

}
