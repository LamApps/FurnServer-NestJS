import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { AdminuserEntity } from './adminuser.entity';
import {CreateAdminuserDto, LoginAdminuserDto, UpdateAdminuserDto} from './dto';
const jwt = require('jsonwebtoken');
import { SECRET } from '../config';
import { AdminuserRO } from './adminuser.interface';
import { validate } from 'class-validator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import * as argon2 from 'argon2';
import { RolesEntity } from '../roles/roles.entity';

@Injectable()
export class AdminuserService {
  constructor(
    @InjectRepository(AdminuserEntity)
    private readonly userRepository: Repository<AdminuserEntity>,
    @InjectRepository(RolesEntity)
    private readonly rolesRepository: Repository<RolesEntity>
  ) {}

  async findAll() {
    const qb = await getRepository(AdminuserEntity)
      .createQueryBuilder('adminuser')
      .leftJoinAndSelect('adminuser.roles', 'roles');

    const users = await qb.getMany();
    return { items: users, totalCount: users.length }
  }

  async find(id: number) {
    const qb = await getRepository(AdminuserEntity)
      .createQueryBuilder('adminuser')
      .leftJoinAndSelect('adminuser.roles', 'roles');
    const user = await qb.where({id: id}).getOne();
    user.role = user.roles.name.toLowerCase();
    user.email = user.email;
    if (!user) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not user.'
      };
    }
    return { item : user };
  }

  async findOne({username, password}: LoginAdminuserDto) {
    const qb = await getRepository(AdminuserEntity)
      .createQueryBuilder('adminuser')
      .leftJoinAndSelect('adminuser.roles', 'roles');

    const user = await qb.where({ username: username }).getOne();
    if (!user) {
      return null;
    }
    user.role = user.roles.name.toLowerCase();
    user.email = user.email;
    if (await argon2.verify(user.password, password)) {
      return user;
    }
    return null;
  }

  async create(dto: CreateAdminuserDto) {
    const { username, email, password, position, firstname, lastname, role, birthday, active, mobile } = dto;
    const qb = await getRepository(AdminuserEntity)
      .createQueryBuilder('adminuser')
      .where('adminuser.username = :username', { username })
      .orWhere('adminuser.email = :email', { email });

    const user = await qb.getOne();
    if (user) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Username and email must be unique.'
      };
    }

    let newUser = new AdminuserEntity();
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;
    newUser.active = active;
    newUser.role = role;
    newUser.firstname = firstname;
    newUser.lastname = lastname;
    newUser.position = position;
    newUser.birthday = birthday;
    newUser.mobile = mobile;

    const errors = await validate(newUser);
    if (errors.length > 0) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Userinput is not valid.'
      };
    } else {
      const savedUser = await this.userRepository.save(newUser);
      const roles = await this.rolesRepository.findOne({ where: { id: dto.roles }, relations: ['adminusers'] });
      roles.adminusers.push(newUser);
      await this.rolesRepository.save(roles);
      
      return { user: savedUser }
    }
  }

  async update(id: number, dto: UpdateAdminuserDto) {
    let user = await this.userRepository.findOne(id);
    if (!user) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not user.'
      }
    }
    user.role = dto.role;
    user.birthday = dto.birthday;
    user.firstname = dto.firstname;
    user.lastname = dto.lastname;
    user.position = dto.position;
    user.email = dto.email;
    user.active = dto.active;

    if (dto.mobile && dto.mobile != "") {
      user.mobile = dto.mobile;
    }

    if (dto.photo && dto.photo != "") {
      user.photo = dto.photo;
    }
    
    if (dto.password && dto.password !== "") {
      user.password = await argon2.hash(dto.password)
    }

    await this.userRepository.update(id, user);
    const updated = await this.userRepository.findOne(id);
    return { item : updated };
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ id: id });
	//	console.log('user doesnt exists');
    if (!user) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not user.'
      }
    }
    return await this.userRepository.delete({ id: id });
  }

  async findById(id: number): Promise<AdminuserRO>{
    const user = await this.userRepository.findOne(id);
	//	console.log('found user');
	//	console.log(user);

    if (!user) {
      const errors = {User: 'admin user not found'};
      throw new HttpException({errors}, 401);
    }

    return this.buildUserRO(user);
  }

  async findByEmail(email: string): Promise<AdminuserRO>{
    const user = await this.userRepository.findOne({email: email});
    return this.buildUserRO(user);
  }

  async update_login(id: number, token: string) {
    let user = await this.userRepository.findOne(id);
    user.token = token;

    await this.userRepository.update(id, user)
    return await this.find(id);
  }


  public generateJWT(user) {
    return jwt.sign({
      id: user.id,
      username: user.username,
      email: user.email,
      exp: new Date().getTime() / 1000 + 20 * 60,
      isAdmin: true,
    }, SECRET);
  };

  private buildUserRO(user: AdminuserEntity) {
    const userRO = {
      id: user.id,
      username: user.username,
      email: user.email,
      token: this.generateJWT(user),
      role: user.role,
      active: user.active,
    };
    return { user: userRO };
  }
}
