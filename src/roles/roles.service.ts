import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { getRepository, Repository } from 'typeorm';
import { AdminuserEntity } from '../adminuser/adminuser.entity';
import { CreateRolesDto } from './dto/create-roles.dto';
import { UpdateRolesDto } from './dto/update-roles.dto';
import { RolesEntity } from './roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private readonly rolesRepository: Repository<RolesEntity>,
    @InjectRepository(AdminuserEntity)
    private readonly userRepository: Repository<AdminuserEntity>
  ) {}
  
  async create(createRolesDto: CreateRolesDto) {
    const { name } = createRolesDto;
    const qb = await getRepository(RolesEntity)
      .createQueryBuilder('roles')
      .where('roles.name = :name', { name });

    const role = await qb.getOne();

    if (role) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Role must be unique.'
      };
    }

    let newRole = new RolesEntity();
    newRole.code = '';
    newRole.name = createRolesDto.name;
    newRole.description = '';

    const errors = await validate(newRole);
    if (errors.length > 0) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: errors
      }
    } else {
      const savedRole = await this.rolesRepository.save(newRole);
      return { item: savedRole };
    }
  }

  async findAll() {
    const roles = await this.rolesRepository.find();
    return { items : roles, totalCount: roles.length };
  }

  async findOne(id: number) {
    const role = await this.rolesRepository.findOne({id: id});
    if (!role) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not Role.'
      };
    }
    return { item : role };
  }

  async update(id: number, updateRolesDto: UpdateRolesDto) {
    const role = await this.rolesRepository.findOne({ id: id });
    if (!role) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not Role.'
      }
    }
    await this.rolesRepository.update(id, updateRolesDto);
    const updated = await this.rolesRepository.findOne({ id: id });
    return { item : updated };
  }

  async remove(id: number) {
    const role = await this.rolesRepository.findOne({ id: id });
    if (!role) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not Role.'
      }
    }
    return await this.rolesRepository.delete({ id: id });
  }
}
