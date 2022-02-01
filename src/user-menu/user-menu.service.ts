import { Injectable } from '@nestjs/common';
import { CreateUserMenuDto } from './dto/create-user-menu.dto';
import { UpdateUserMenuDto } from './dto/update-user-menu.dto';

@Injectable()
export class UserMenuService {
  create(createUserMenuDto: CreateUserMenuDto) {
    return 'This action adds a new userMenu';
  }

  findAll() {
    return `This action returns all userMenu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userMenu`;
  }

  update(id: number, updateUserMenuDto: UpdateUserMenuDto) {
    return `This action updates a #${id} userMenu`;
  }

  remove(id: number) {
    return `This action removes a #${id} userMenu`;
  }
}
