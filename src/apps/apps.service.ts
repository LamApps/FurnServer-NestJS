import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAppsDto } from './dto/create-apps.dto';
import { UpdateAppsDto } from './dto/update-apps.dto';
import { Repository, getRepository } from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import { AppsEntity } from './apps.entity';
import { validate } from 'class-validator';

@Injectable()
export class AppsService {
  constructor(
    @InjectRepository(AppsEntity)
    private readonly appsRepository: Repository<AppsEntity>,
  ) {}
  
  async create(createAppsDto: CreateAppsDto) {
    const { type } = createAppsDto;
    const qb = await getRepository(AppsEntity)
      .createQueryBuilder('apps')
      .leftJoinAndSelect('apps.companies', 'companies')
      .where('apps.type = :type', { type });

    const apps = await qb.getOne();

    if (apps) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'App Type must be unique.'
      };
    }

    let newApps = new AppsEntity();
    newApps.type = createAppsDto.type;
    newApps.app_id = createAppsDto.app_id;
    newApps.expire_date = createAppsDto.expire_date;
    newApps.first_time_status = createAppsDto.first_time_status;
    newApps.menu_password = createAppsDto.menu_password;
    newApps.active = createAppsDto.active;

    const errors = await validate(newApps);
    if (errors.length > 0) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Input is not valid.'
      };
    } else {

      const savedApps = await this.appsRepository.save(newApps);
      /*
      const company = await this.companyRepository.findOne({ where: { id: createUuidDto.company }, relations: ['uuids'] });
      company.uuids.push(savedUuid);
      await this.companyRepository.save(company);
     */ 
      return { status: HttpStatus.OK, item: savedApps }
    }
  }
  async findAll() {
    const qb = await getRepository(AppsEntity)
      .createQueryBuilder('apps')
      .leftJoinAndSelect('apps.companies', 'companies');

    const apps = await qb.getMany();
    return { items: apps, totalCount: apps.length }
  }

  async findOne(id: number) {
	  
    const qb = await getRepository(AppsEntity)
      .createQueryBuilder('apps')
      .leftJoinAndSelect('apps.companies', 'companies');

    const apps = await qb.where({ id:id }).getOne();
	  
    if (!apps) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not app.'
      };
    }
    return { item : apps };
  }

  async update(id: number, updateAppsDto: UpdateAppsDto) {
    let apps = await this.appsRepository.findOne(id);
    if (!apps) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not apps.'
      }
    }
    apps.type = updateAppsDto.type;
    apps.app_id = updateAppsDto.app_id;
    apps.expire_date = updateAppsDto.expire_date;
    apps.first_time_status = updateAppsDto.first_time_status;
    apps.menu_password = updateAppsDto.menu_password;
    apps.active = updateAppsDto.active;

    await this.appsRepository.update(id, apps);
    const updated = await this.appsRepository.findOne({ id: id });
    return { item : updated };
  }



  async remove(id: number) {
    const apps = await this.appsRepository.findOne({ id: id });
    if (!apps) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not app.'
      }
    }
    return await this.appsRepository.delete({ id: id });
  }
  
}
