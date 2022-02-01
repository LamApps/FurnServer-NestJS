import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { getRepository, Repository } from 'typeorm';
import { CompanyMenuEntity } from '../company-menu/company-menu.entity';
import { MenuEntity } from '../menu/menu.entity';
import { PasswordEntity } from '../password/password.entity';
import { CompanyEntity } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}
  
  async create(createCompanyDto: CreateCompanyDto) {
    const { name, app_id, number, code } = createCompanyDto;
    let qb = await getRepository(CompanyEntity)
      .createQueryBuilder('company')
      .where('company.name = :name', { name })
      .orWhere('company.app_id = :app_id', { app_id });

    let company = await qb.getOne();
    if (company) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Name must be unique.'
      }
    }

    qb = await getRepository(CompanyEntity)
      .createQueryBuilder('company')
      .where('company.number = :number', { number });

    company = await qb.getOne();
    if (company) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Company # must be unique.'
      }
    }

    let newCompany = new CompanyEntity();
    newCompany.number = number;
    newCompany.app_id = app_id;
    newCompany.name = name;
    newCompany.expire_date = createCompanyDto.expire_date;
    newCompany.first_time_status = createCompanyDto.first_time_status;
    newCompany.menu_password = createCompanyDto.menu_password;
    newCompany.active = createCompanyDto.active;
    newCompany.code = code;
    newCompany.timeout = createCompanyDto.timeout;

    const errors = await validate(newCompany);
    if (errors.length > 0) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: errors
      }
    } else {
      const savedCompany = await this.companyRepository.save(newCompany);
      return { company: savedCompany };
    }
  }

  async findAll() {
    const items = await this.companyRepository
      .createQueryBuilder('company')
      .leftJoinAndSelect('company.menus', 'menus')
      .leftJoinAndSelect('menus.menu', 'menu')
      .getMany();
    return { items : items, totalCount: items.length };
  }

  async findOne(id: number) {
    const company = await this.companyRepository
      .createQueryBuilder('company')
      .leftJoinAndSelect('company.enabled', 'enabled')
      .leftJoinAndSelect('company.menus', 'menus')
      .leftJoinAndSelect('menus.menu', 'menu')
      .where('company.id=:id', { id: id})
      .getOne();
    if (!company) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not company.'
      };
    }
    return { item : company };
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.companyRepository.findOne({ id: id });
    if (!company) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not company.'
      }
    }
    await this.companyRepository.update(id, updateCompanyDto);
    const updated = await this.companyRepository.findOne({ id: id });
    return { company : updated };
  }

  async remove(id: number) {
    const company = await this.companyRepository.findOne({ id: id });
    if (!company) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not company.'
      }
    }
    return await this.companyRepository.delete({ id: id });
  }

  async updatePermission(id: number, dto: any[]) {
    var company = await this.companyRepository
      .createQueryBuilder('company')
      .leftJoinAndSelect('company.menus', 'menus')
      .where('company.id=:id', { id: id })
      .getOne();
    if (!company) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not company.'
      }
    }

    for (let i = 0; i < dto.length; i++) {
      const one = dto[i];
      const permission = one.permission

      const menu_entity = await getRepository(MenuEntity)
        .createQueryBuilder('menu')
        .leftJoinAndSelect('menu.company_menus', 'company_menus')
        .where('menu.id=:id', {id: one.id})
        .getOne();
      if (!menu_entity) return;

      var company_menu_entity = await getRepository(CompanyMenuEntity)
        .createQueryBuilder('company_menu')
        .leftJoinAndSelect('company_menu.company', 'company')
        .leftJoinAndSelect('company_menu.menu', 'menu')
        .where('company.id=:id', { id: id })
        .andWhere('menu.id=:mid', { mid: one.id })
        .getOne();
      if (company_menu_entity) {
        company_menu_entity.permission = permission
        await getRepository(CompanyMenuEntity).save(company_menu_entity);
      } else {
        company_menu_entity = new CompanyMenuEntity();
        company_menu_entity.permission = permission;

        const saved = await getRepository(CompanyMenuEntity).save(company_menu_entity);
        
        menu_entity.company_menus.push(saved);
        await getRepository(MenuEntity).save(menu_entity);

        company.menus.push(saved);
        company = await getRepository(CompanyEntity).save(company);
      }
    }
    const updated = await this.findOne(id);
    return { company: updated };
  }

  async enable(id: number, dto: any[]) {
    const company = await this.companyRepository
      .createQueryBuilder('company')
      .leftJoinAndSelect('company.enabled', 'enabled')
      .where('company.id=:id', { id: id })
      .getOne();
    if (!company) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not company.'
      }
    }
    company.enabled = [];
    dto.forEach(one => {
      const password = new PasswordEntity();
      password.id = one.id;
      password.code = one.code;
      password.description = one.description;
      password.name = one.name;
      
      company.enabled.push(password);
    })
    await this.companyRepository.save(company);

    const updated = await this.companyRepository
      .createQueryBuilder('company')
      .leftJoinAndSelect('company.enabled', 'enabled')
      .where('company.id=:id', {id:id})
      .getOne();
    return { enabled: updated.enabled };
  }
}
