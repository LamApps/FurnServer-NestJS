import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationEntity } from './entities/location.entity';
import { CompanyEntity } from '../../../company/company.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,

  ) {}

  async create(createLocationDto: CreateLocationDto) {
    const location = await this.locationRepository.findOne({where:{location:createLocationDto.location}});
    if (location) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Location must be unique.'
      };
    }
    let newLocation = new LocationEntity();
    newLocation.database = createLocationDto.database;
    newLocation.location = createLocationDto.location;
    newLocation.name = createLocationDto.name;
    newLocation.description = createLocationDto.description;
    newLocation.address = createLocationDto.address;
    newLocation.city = createLocationDto.city;
    newLocation.state = createLocationDto.state;
    newLocation.zip = createLocationDto.zip;
    newLocation.phone = createLocationDto.phone;
    newLocation.email = createLocationDto.email;
    newLocation.website = createLocationDto.website;
    newLocation.open_hours = createLocationDto.hours;
    newLocation.timezone = createLocationDto.timezone;
    newLocation.account = createLocationDto.account;
    newLocation.so_print = createLocationDto.soprint;
    newLocation.del_print = createLocationDto.delprint;
    newLocation.logo_url = createLocationDto.photo;

    const savedLocation = await this.locationRepository.save(newLocation);

    const company = await this.companyRepository.findOne({where:{id:createLocationDto.company}, relations:['locations']});
    company.locations.push(savedLocation);
    this.companyRepository.save(company);

    return { status: HttpStatus.OK, item: savedLocation }
  }

  async findAll(company) {
    let qb = getRepository(LocationEntity)
    .createQueryBuilder('locations')
    .leftJoinAndSelect('locations.company', 'company');
    if(company>0){
      qb = qb.where('company.id = :id', {id: company});
    }

    const locations = await qb.getMany();
    return { items: locations, totalCount: locations.length }

  }

  async findOne(id: number) {
    const code = await this.locationRepository.findOne({id: id});
    if (!code) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not Role.'
      };
    }
    return { item : code };

  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const location = await this.locationRepository.findOne({ id: id });
    if (!location) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not Role.'
      }
    }
    location.database = updateLocationDto.database;
    location.location = updateLocationDto.location;
    location.name = updateLocationDto.name;
    location.description = updateLocationDto.description;
    location.address = updateLocationDto.address;
    location.city = updateLocationDto.city;
    location.state = updateLocationDto.state;
    location.zip = updateLocationDto.zip;
    location.phone = updateLocationDto.phone;
    location.email = updateLocationDto.email;
    location.website = updateLocationDto.website;
    location.open_hours = updateLocationDto.hours;
    location.timezone = updateLocationDto.timezone;
    location.account = updateLocationDto.account;
    location.so_print = updateLocationDto.soprint;
    location.del_print = updateLocationDto.delprint;
    location.logo_url = updateLocationDto.photo;
    
    const updated = await this.locationRepository.save(location);
    return { item : updated };

  }

  async remove(id: number) {
    const location = await this.locationRepository.findOne({ id: id });
    if (!location) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not Role.'
      }
    }
    return await this.locationRepository.delete({ id: id });
  }
}
