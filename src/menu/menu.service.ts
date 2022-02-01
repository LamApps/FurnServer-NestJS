import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { getRepository, Repository } from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
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
    private readonly companyRepository: Repository<CompanyEntity>
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
    // newMenu.permission = Permission.None;

    const errors = await validate(newMenu);
    if (errors.length > 0) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Input is not valid.'
      };
    } else {
      const savedMenu = await this.menuRepository.save(newMenu);       
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
