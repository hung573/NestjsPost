import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { query } from 'express';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserDTO } from 'src/dto/users/user.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from 'src/dto/users/login.dto';
import { CurrentUser } from './decorator/currentUser.decorator';
import { UserEntity } from 'src/entity/user.entity';

@Controller('/api/user')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(LoggingInterceptor)
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
    @UseGuards(AuthGuard)
    FindAll(): Promise<UserDTO[]>{
        console.log('Second');
        return  this.userService.findall();
    }

    @Get('current-use')
    @UseGuards(AuthGuard)
    GetCurrentUser(@CurrentUser() currentUser: UserEntity){
        return currentUser;
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    FindById(@Param('id',ParseIntPipe) id: number): Promise<UserDTO>{
        return  this.userService.findByid(id);
    }

    @Put(':id')
    Update(@Param('id',ParseIntPipe) id: number, @Body() userdto: UserDTO): Promise<UserDTO>{
        return this.userService.update(id,userdto);
    }

    @Delete(':id')
    Delete(@Param('id',ParseIntPipe) id: number): Promise<boolean>{
        return this.userService.delete(id);
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
