import { BadRequestException } from "@nestjs/common";
import { UserEntity } from "src/entity/user.entity";

export class checkPermission{
    static checkUserUpdate(id: number, currentUser: UserEntity){
        if(id === currentUser.id) return;
        if(currentUser.role === 'ADMIN') return;
        throw new BadRequestException('User id khong hop le voi tai khoan dang nhap')
    }   
    static checkUserDelete(id: number,currentUser: UserEntity){
        if(id === currentUser.id) return;
        if(currentUser.role === 'ADMIN') return;
        throw new BadRequestException('Ban khong du tham quyen de xoa account cua nguoi khac')
    }  
    static checkPostUpdate(idUser: number, currentUser: UserEntity){
        if(idUser === currentUser.id) return;
        throw new BadRequestException('Bai viet khong phai la cua ban, nen k the update')
    }   
    static checkPostDelete(idUser: number, currentUser: UserEntity){
        if(idUser === currentUser.id) return;
        throw new BadRequestException('Bai viet khong phai la cua ban, nen k the delete')
    }

}