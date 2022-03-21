import { HttpStatus, Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { CompanyMenuEntity } from '../company-menu/company-menu.entity';
import { CompanyEntity } from '../company/company.entity';
import { CompanyService } from '../company/company.service';
import { MenuEntity } from '../menu/menu.entity';
import { CompanyRoleEntity } from './company-role.entity';
import { CreateCompanyRoleDto } from './dto/create-company-role.dto';
import { UpdateCompanyRoleDto } from './dto/update-company-role.dto';
import { RoleMenuEntity } from './role-menu.entity';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class CompanyRoleService {

  async create(createCompanyRoleDto: CreateCompanyRoleDto) {
    const { company_id, name, description, menus } = createCompanyRoleDto;
    const company = await getRepository(CompanyEntity)
      .createQueryBuilder('company')
      .leftJoinAndSelect('company.roles', 'roles')
      .where('company.id=:id', { id: company_id })
      .getOne();
    if (!company) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid company ID.'
      }
    }

    let qb = await getRepository(CompanyRoleEntity)
      .createQueryBuilder('company_role')
      .where('company_role.name = :name', { name })
      .andWhere('company_role.active = true')
      .andWhere('company_role.company = :company_id', { company_id })

    let role = await qb.getOne();
    if (role) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Name must be unique.'
      }
    }
    let newRole = new CompanyRoleEntity();
    newRole.name = name;
    newRole.description = description || '';
    newRole.menus = [];

    for (let i = 0; i < menus.length; i++) {
      const menu = menus[i];

      var menu_entity = await getRepository(MenuEntity)
        .createQueryBuilder('menu')
        .leftJoinAndSelect('menu.role_menus', 'role_menus')
        .where('menu.id=:id', { id: menu.id })
        .getOne();

      menu.id==131 && console.log(menu.id, menu_entity)
      if (!menu_entity) continue;
      const roleMenu = new RoleMenuEntity();
      roleMenu.permission = menu.permission;

      const saved = await getRepository(RoleMenuEntity).save(roleMenu);
      
      menu_entity.role_menus.push(saved);
      await getRepository(MenuEntity).save(menu_entity);

      newRole.menus.push(saved);
    }

    const savedRole = await getRepository(CompanyRoleEntity).save(newRole);

    company.roles.push(savedRole);
    await getRepository(CompanyEntity).save(company);

    return { item: savedRole }
  }

  async findAll(id: number) {
    let qb = await getRepository(CompanyRoleEntity)
      .createQueryBuilder('company_role')
      .leftJoinAndSelect('company_role.menus', 'menus')
      .leftJoinAndSelect('menus.menu', 'menu')
      .where('company_role.company = :id', { id })
      .andWhere('company_role.active = true');

    const roles = await qb.getMany();
    return { items : roles, totalCount: roles.length };
  }

  async findOne(id: number) {
    let qb = await getRepository(CompanyRoleEntity)
      .createQueryBuilder('company_role')
      .leftJoinAndSelect('company_role.menus', 'menus')
      .leftJoinAndSelect('menus.menu', 'menu')
      .where('company_role.id = :id', { id })
      .andWhere('company_role.active = true');

    const role = await qb.getOne();
    if (!role) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not role.'
      };
    }
    return { item: role }
  }

  async update(id: number, updateCompanyRoleDto: UpdateCompanyRoleDto) {
    let role = await this.findOne(id);
    if (!role) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not role.'
      };
    }
    let roleEnity = role.item;
    roleEnity.name = updateCompanyRoleDto.name;
    roleEnity.menus = [];
    for (let i = 0; i < updateCompanyRoleDto.menus.length; i++) {
      const menu = updateCompanyRoleDto.menus[i];
      if (menu.rid) {
        var roleMenu = await getRepository(RoleMenuEntity)
          .createQueryBuilder('role_menu')
          .where('role_menu.id=:id', {id: menu.rid})
          .getOne();

        if (!roleMenu) continue;

        roleMenu.permission = menu.permission;

        const saved = await getRepository(RoleMenuEntity).save(roleMenu);
        roleEnity.menus.push(saved);
          
      } else {
        var menu_entity = await getRepository(MenuEntity)
        .createQueryBuilder('menu')
        .leftJoinAndSelect('menu.role_menus', 'role_menus')
        .where('menu.id=:id', { id: menu.id })
        .getOne();

        console.log(menu_entity);
        if (!menu_entity) continue;

        var roleMenu = new RoleMenuEntity();
        roleMenu.permission = menu.permission;

        const saved = await getRepository(RoleMenuEntity).save(roleMenu);
        
        menu_entity.role_menus.push(saved);
        await getRepository(MenuEntity).save(menu_entity);

        roleEnity.menus.push(saved);
      }
    }
    let saved = await getRepository(CompanyRoleEntity).save(roleEnity);
    return { item: saved }
  }

  async remove(id: number) {
    let role = await this.findOne(id);
    if (!role) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not role.'
      };
    }

    const users = await getRepository(UserEntity)
    .createQueryBuilder('user')  
    .select(['user.username'])
    .leftJoin('user.role', 'role')
    .where('user.role = :id', {id})
    .getMany();

    if(users.length>0){
      return { flag: 'exist', payload: users };
    }else{
      await getRepository(CompanyRoleEntity).update(id, { active: false });
      return { flag: 'success' };
    }
  }
}
