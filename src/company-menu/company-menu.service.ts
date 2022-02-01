import { HttpStatus, Injectable } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import { Permission } from '../enum/permission.enum';
import { CompanyMenuEntity } from './company-menu.entity';

@Injectable()
export class CompanyMenuService {
  constructor(
  ) {}
  
  async findAll(company: number) {
    const qb = await getRepository(CompanyMenuEntity)
      .createQueryBuilder('company_menu')
      .leftJoinAndSelect('company_menu.company', 'company')
      .leftJoinAndSelect('company_menu.menu', 'menu')
      .where('company.id = :id', {id: company});

    const menus = await qb.getMany();
    return { items: menus, totalCount: menus.length }
  }

  async findOne(id: number) {
    const qb = await getRepository(CompanyMenuEntity)
      .createQueryBuilder('company_menu')
      .leftJoinAndSelect('company_menu.company', 'company')
      .leftJoinAndSelect('company_menu.menu', 'menu');
    const menu = await qb.where({ id: id }).getOne();
    if (!menu) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not menu.'
      };
    }
    return { item : menu };
  }

  async update(company: number, menu: number, permission: Permission) {
  }
}
