import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { userInfo } from 'os';
import { Repository, getRepository } from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import { CreateUuidDto } from './dto/create-uuid.dto';
import { UpdateUuidDto } from './dto/update-uuid.dto';
import { UUIDEntity } from './uuid.entity';

@Injectable()
export class UuidService {
  constructor(
    @InjectRepository(UUIDEntity)
    private readonly uuidRepository: Repository<UUIDEntity>,
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>
  ) {}
  
  async create(createUuidDto: CreateUuidDto) {
    const qb = await getRepository(UUIDEntity)
      .createQueryBuilder('uuid')
      .where('uuid.uuid = :uuid', { uuid: createUuidDto.uuid });

    const uuid = await qb.getOne();

    if (uuid) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'UUID must be unique.'
      };
    }
    const qb1 = await getRepository(UUIDEntity)
      .createQueryBuilder('uuid')
      .leftJoinAndSelect('uuid.company', 'company')
      .where('uuid.unique_id = :unique_id', { unique_id: createUuidDto.unique_id })
      .andWhere('company.id = :company', { company: createUuidDto.company });

    const uuid1 = await qb1.getOne();

    if (uuid1) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Unique ID must be unique.'
      };
    }

    let newUuid = new UUIDEntity();
    newUuid.unique_id = createUuidDto.unique_id;
    newUuid.uuid = createUuidDto.uuid;
    newUuid.description = createUuidDto.description;
    newUuid.last_date_verified = createUuidDto.last_date_verified;
    newUuid.version = createUuidDto.version;
    newUuid.active = createUuidDto.active;

    const errors = await validate(newUuid);
    if (errors.length > 0) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Input is not valid.'
      };
    } else {

      const savedUuid = await this.uuidRepository.save(newUuid);
      
      const company = await this.companyRepository.findOne({ where: { id: createUuidDto.company }, relations: ['uuids'] });
      company.uuids.push(savedUuid);
      await this.companyRepository.save(company);
      
      return { status: HttpStatus.OK, item: savedUuid }
    }
  }

  async getLatestUniqueId(company: number) {
    const uuids = await getRepository(UUIDEntity)
      .createQueryBuilder('uuid')
      .leftJoinAndSelect('uuid.company', 'company')
      .where('company.id = :id', {id: company}).getMany();

    for (let unique_id = 1; unique_id < 1000; unique_id++) {
      let exist: boolean = false;
      uuids.forEach(item => {
          if (item.unique_id == ('000' + unique_id).substr(-3)) {
              exist = true;
          }
      });
      if (!exist) {
        return { id: unique_id }
      }
    }
  }
  
  async findAll(company: number) {
    const qb = await getRepository(UUIDEntity)
      .createQueryBuilder('uuid')
      .leftJoinAndSelect('uuid.company', 'company')
      .where('company.id = :id', {id: company});

    const uuids = await qb.getMany();
    return { items: uuids, totalCount: uuids.length }
  }

  async findOne(id: number) {
    const uuid = await this.uuidRepository.findOne({id: id});
    if (!uuid) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not uuid.'
      };
    }
    return { item : uuid };
  }

  async update(id: number, updateUuidDto: UpdateUuidDto) {
    const qb = await getRepository(UUIDEntity)
      .createQueryBuilder('uuid')
      .where('uuid.unique_id = :unique_id', { unique_id: updateUuidDto.unique_id });

    const orig_uuid = await qb.getOne();
    console.log(orig_uuid, id)
    if (orig_uuid && orig_uuid.id != id) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Unique ID must be unique.'
      };
    }

    let uuid = await this.uuidRepository.findOne(id);
    if (!uuid) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not uuid.'
      }
    }
    uuid.unique_id = updateUuidDto.unique_id;
    uuid.last_date_verified = updateUuidDto.last_date_verified;
    uuid.description = updateUuidDto.description;
    uuid.version = updateUuidDto.version;
    uuid.active = updateUuidDto.active;

    await this.uuidRepository.update(id, uuid);
    const updated = await this.uuidRepository.findOne({ id: id });
    return { item : updated };
  }

  async remove(id: number) {
    const uuid = await this.uuidRepository.findOne({ id: id });
    if (!uuid) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not uuid.'
      }
    }
    return await this.uuidRepository.delete({ id: id });
  }
}
