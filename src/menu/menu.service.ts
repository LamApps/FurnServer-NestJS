import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { getRepository, Repository } from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import { CompanyMenuEntity } from '../company-menu/company-menu.entity';
import { CompanyRoleEntity } from '../company-role/company-role.entity';
import { RoleMenuEntity } from '../company-role/role-menu.entity';
import { Permission } from '../enum/permission.enum';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuEntity } from './menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
    @InjectRepository(CompanyMenuEntity)
    private readonly companyMenuRepository: Repository<CompanyMenuEntity>,
    @InjectRepository(CompanyRoleEntity)
    private readonly companyRoleRepository: Repository<CompanyRoleEntity>,
    @InjectRepository(RoleMenuEntity)
    private readonly roleMenuRepository: Repository<RoleMenuEntity>

  ) {}

  async create(createMenuDto: CreateMenuDto) {
    const qb = await getRepository(MenuEntity)
      .createQueryBuilder('menu')
      .where('menu.link = :link', { link: createMenuDto.link });

    const menu = await qb.getOne();

    if (menu) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Link must be unique.'
      };
    }

    let newMenu = new MenuEntity();
    newMenu.link = createMenuDto.link;
    newMenu.description = createMenuDto.description;

    const errors = await validate(newMenu);
    if (errors.length > 0) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Input is not valid.'
      };
    } else {
      const savedMenu = await this.menuRepository.save(newMenu);
      
      //add to company as none permission
      const companies = await this.companyMenuRepository
      .createQueryBuilder('company_menu')
      .select('company_menu.companyId')
      .groupBy('company_menu.companyId')
      .getRawMany();

      const menu = await this.menuRepository.findOne({where:{id:savedMenu.id}, relations: ['company_menus']});
      
      companies.forEach(async (item)=>{
        let newCompanyMenu = new CompanyMenuEntity();
        newCompanyMenu.permission = Permission.None;
        const savedCompanyMenu = await this.companyMenuRepository.save(newCompanyMenu);

        menu.company_menus.push(savedCompanyMenu);
        await this.menuRepository.save(menu);

        const company = await this.companyRepository.findOne({where:{id:item.companyId}, relations: ['menus']})
        company.menus.push(savedCompanyMenu);
        await this.companyRepository.save(company);
      });

      //add to role as none permission
      const role = await this.companyRoleRepository
      .createQueryBuilder('company_role')
      .where('company_role.active = :active', {active: true})
      .getMany();

      const role_menu = await this.menuRepository.findOne({where:{id:savedMenu.id}, relations: ['role_menus']});
      role.forEach(async (item)=>{
        let newRollMenu = new RoleMenuEntity();
        newRollMenu.permission = Permission.None;
        const savedRoleMenu = await this.roleMenuRepository.save(newRollMenu);

        const role = await this.companyRoleRepository.findOne({where:{id:item.id}, relations: ['menus']});
        role.menus.push(savedRoleMenu);
        await this.companyRoleRepository.save(role);

        role_menu.role_menus.push(savedRoleMenu);
        await this.menuRepository.save(role_menu);

      })

      return { status: HttpStatus.OK, item: savedMenu }
    }
  }

  async findAll() {
    const qb = await getRepository(MenuEntity)
      .createQueryBuilder('menu');

    const menus = await qb.getMany();
    return { items: menus, totalCount: menus.length }
  }

  async findOne(id: number) {
    const menu = await this.menuRepository.findOne({id: id});
    if (!menu) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not menu.'
      };
    }
    return { item : menu };
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    let menu = await this.menuRepository.findOne(id);
    if (!menu) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not menu.'
      }
    }
    menu.link = updateMenuDto.link;
    menu.description = updateMenuDto.description;

    await this.menuRepository.update(id, menu);
    const updated = await this.menuRepository.findOne({ id: id });
    return { item : updated };
  }

  async remove(id: number) {
    await this.companyMenuRepository
    .createQueryBuilder()
    .delete()
    .where("menuId = :id", { id: id })
    .execute();

    await this.roleMenuRepository
    .createQueryBuilder()
    .delete()
    .where("menuId = :id", { id: id })
    .execute();

    const menu = await this.menuRepository.findOne({ id: id });
    if (!menu) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not menu.'
      }
    }
    return await this.menuRepository.delete({ id: id });
  }
}
