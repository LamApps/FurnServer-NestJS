import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { UserEntity } from './user.entity';
import {CreateUserDto, LoginUserDto, UpdateUserDto} from './dto';
const jwt = require('jsonwebtoken');
import { SECRET } from '../config';
import { UserRO } from './user.interface';
import { validate } from 'class-validator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import * as argon2 from 'argon2';
import { CompanyEntity } from '../company/company.entity';
import { MenuEntity } from '../menu/menu.entity';
import { CompanyRoleEntity } from '../company-role/company-role.entity';
import { RoleMenuEntity } from "../company-role/role-menu.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>
  ) {}

  async findAll() {
    const qb = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.company', 'company')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('role.menus', 'menus')
      .leftJoinAndSelect('menus.menu', 'menu')
      .where('deleted = false');

    const users = await qb.getMany();
    return { items: users, totalCount: users.length }
  }

  async find(id: number) {
    const qb = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.company', 'company')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('role.menus', 'menus')
      .leftJoinAndSelect('menus.menu', 'menu')
      .where('deleted = false');
    const user = await qb.where({id: id}).getOne();
    if (!user) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not user.'
      };
    }
    return { item : user };
  }
  
  
  async findAllLimited(company: number) {
    const qb = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.company', 'company')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('role.menus', 'menus')
      .leftJoinAndSelect('menus.menu', 'menu')
      .where('deleted = false')
	    .andWhere('user.company = :company', { company });

    const users = await qb.getMany();
    return { items: users, totalCount: users.length }
  }

  async findOne({username, password, company}: LoginUserDto): Promise<UserEntity> {
    const qb = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.company', 'company')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('role.menus', 'menus')
      .leftJoinAndSelect('menus.menu', 'menu')
      .where('deleted = false');

    const user = await qb.where({ username: username }).andWhere('LOWER(company.code) = :company', { company : company.toLowerCase() }).getOne();

    if (!user) {
      return null;
    }
    if (await argon2.verify(user.password, password)) {
      return user;
    }
    return null;
  }

  async getDatabase(username, company) {
    const qb = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.company', 'company');
    const user = await qb.where({ username: username }).andWhere('LOWER(company.code) = :company', { company : company.toLowerCase() }).getOne();
    if (!user) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not user.'
      }
    } else {
      let database = user.database
      if (database == undefined || database == "") database = "1"
      let default_database = user.default_database
      if (default_database == undefined || default_database == "") default_database = "1"
      return {
        status: HttpStatus.OK,
        result: {
          database: database,
          default_database: default_database
        }
      }
    }
  }

  async create(dto: CreateUserDto) {
    const { username, email, password, position, firstname, lastname, role, birthday, active, mobile, timeout } = dto;

    const qb = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.company', 'company')
      .where('user.username = :username', { username })

    const user = await qb.andWhere('company.id = :company', { company: dto.company }).getOne();
    if (user) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Username must be unique.'
      };
    }

    let newUser = new UserEntity();
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;
    newUser.active = active;
    newUser.firstname = firstname;
    newUser.lastname = lastname;
    newUser.position = position;
    newUser.birthday = birthday;
    newUser.mobile = mobile;
    newUser.database = dto.database;
    newUser.default_database = dto.default_database;
    if (timeout) {
      newUser.timeout = timeout;
    }

    const errors = await validate(newUser);
    if (errors.length > 0) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Userinput is not valid.'
      };
    } else {

      const savedUser = await this.userRepository.save(newUser);
      
      const company = await this.companyRepository.findOne({ where: { id: dto.company }, relations: ['users'] });
      company.users.push(savedUser);
      await this.companyRepository.save(company);

      if (role != -1) {
        const company_role = await getRepository(CompanyRoleEntity)
          .createQueryBuilder('company_role')
          .leftJoinAndSelect('company_role.users', 'users')
          .leftJoinAndSelect('company_role.menus', 'menus')
          .leftJoinAndSelect('menus.menu', 'menu')
          .where('company_role.id = :id', { id: role })
          .getOne();
        if (company_role) {
          company_role.users.push(newUser);
          await getRepository(CompanyRoleEntity).save(company_role);

          const dto = company_role.menus.map(menu => {
            return { ...menu, id: menu.menu.id }
          })
          await this.updatePermission(savedUser.id, -2, dto);
        }
      }
      
      return { status: HttpStatus.OK, user: savedUser }
    }
  }

  async update_login(id: number, dto: LoginUserDto, token: string) {
    let user = await this.userRepository.findOne(id);
    user.ip_address = dto.ip_address;
    user.last_login_database = dto.last_login_database;
    user.last_login_date = dto.last_login_date;
    user.last_login_time = dto.last_login_time;
    user.operating_system = dto.operating_system;
    user.browser = dto.browser;
    user.token = token;

    await this.userRepository.update(id, user)

    const qb = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.company', 'company')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('role.menus', 'menus')
      .leftJoinAndSelect('menus.menu', 'menu')
      .where({ id : id })

    const updated = await qb.getOne();
    return updated
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.company', 'company')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('role.menus', 'menus')
      .leftJoinAndSelect('menus.menu', 'menu')
      .where('user.id = :id', { id: id })
      .getOne();

    if (!user) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not user.'
      }
    }

    user.birthday = dto.birthday
    user.firstname = dto.firstname
    user.lastname = dto.lastname
    user.position = dto.position
    user.email = dto.email
    user.photo = dto.photo
    user.active = dto.active
    user.chat_alert = dto.chatalert
    user.sound = dto.sound
    user.alert_fadetime = dto.alert_fadetime;
    user.mobile = dto.mobile
    if (dto.timeout) {
      user.timeout = dto.timeout
    }
    if (dto.database) {
      user.database = dto.database
    }
    if (dto.default_database) {
      user.default_database = dto.default_database
    }
    if (dto.password && dto.password !== "") {
      user.password = await argon2.hash(dto.password)
    }
    
    let saved = await this.userRepository.save(user);

    // delete old user role
    if (user.role) {
      const company_role = await getRepository(CompanyRoleEntity)
        .createQueryBuilder('company_role')
        .leftJoinAndSelect('company_role.users', 'users')
        .where('company_role.id = :id', { id: user.role.id })
        .getOne();
      if (company_role) {
        company_role.users = company_role.users.filter(role => {
          return role.id !== user.role.id
        })
        await getRepository(CompanyRoleEntity).save(company_role);
      }
    }

    // update new user role
    if (dto.role != -1) {
      const company_role = await getRepository(CompanyRoleEntity)
        .createQueryBuilder('company_role')
        .leftJoinAndSelect('company_role.users', 'users')
        .leftJoinAndSelect('company_role.menus', 'menus')
        .leftJoinAndSelect('menus.menu', 'menu')
        .where('company_role.id = :id', { id: dto.role })
        .getOne();
      if (company_role) {
        company_role.users.push(user);
        await getRepository(CompanyRoleEntity).save(company_role);

        const dto = company_role.menus.map(menu => {
          return { ...menu, id: menu.menu.id }
        })
        await this.updatePermission(user.id, -2, dto);
      }
    }

    return { item : saved };
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ id: id });
    if (!user) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not user.'
      }
    }
    return await this.userRepository.update(id, { deleted: true });
  }

  async findById(id: number): Promise<UserRO>{
    const user = await this.userRepository.findOne(id);

    if (!user) {
      const errors = {User: ' not found'};
      throw new HttpException({errors}, 401);
    }

    return this.buildUserRO(user);
  }

  async findByEmail(email: string): Promise<UserRO>{
    const user = await this.userRepository.findOne({email: email});
    return this.buildUserRO(user);
  }


  async updatePermission(id: number, role: number, dto: any[]) {
    var user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.id=:id', { id: id })
      .getOne();
    if (!user) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not company.'
      }
    }

    for (let i = 0; i < dto.length; i++) {
      const one = dto[i];
      const permission = one.permission

      await getRepository(RoleMenuEntity)
        .createQueryBuilder()
        .update({permission: permission})
        .where('menuId=:id', {id: one.id})
        .andWhere('roleId=:rid', {rid: role})
        .execute();
    }

    
    if (user.role && role != -2) {
      const company_role = await getRepository(CompanyRoleEntity)
        .createQueryBuilder('company_role')
        .leftJoinAndSelect('company_role.users', 'users')
        .where('company_role.id = :id', { id: user.role.id })
        .getOne();
      if (company_role) {
        company_role.users = company_role.users.filter(role => {
          return role.id !== user.role.id
        })
        await getRepository(CompanyRoleEntity).save(company_role);
      }
    }

    if (role > 0) {
      const company_role = await getRepository(CompanyRoleEntity)
        .createQueryBuilder('company_role')
        .leftJoinAndSelect('company_role.users', 'users')
        .where('company_role.id = :id', { id: role })
        .getOne();
      if (company_role) {
        company_role.users.push(user);
        await getRepository(CompanyRoleEntity).save(company_role);
      }
    }
    const updated = await this.find(id);
    return { user: updated };
  }

  public generateJWT(user) {
    return jwt.sign({
      id: user.id,
      username: user.username,
      email: user.email,
      exp: new Date().getTime() / 1000 + 12 * 3600,
    }, SECRET);
  };

  private buildUserRO(user: UserEntity) {
    const userRO = {
      id: user.id,
      username: user.username,
      email: user.email,
      token: this.generateJWT(user),
      role: user.role,
      company: user.company,
      active: user.active,
    };
    return { user: userRO };
  }
}
