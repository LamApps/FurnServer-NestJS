import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { VerifyRoomDto } from './dto/verify.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository, getRepository } from 'typeorm';
import { CompanyEntity } from '../../company/company.entity';
import { UserEntity } from '../../user/user.entity';
import { AdminuserEntity } from '../../adminuser/adminuser.entity';
import { RoomsEntity } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(RoomsEntity)
    private readonly roomsRepository: Repository<RoomsEntity>,
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AdminuserEntity)
    private readonly adminUserRepository: Repository<AdminuserEntity>
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    if(createRoomDto.flag === 1) {
      let room = new RoomsEntity();
      room.name = createRoomDto.name;
      room.password = createRoomDto.password;
  
      const errors = await validate(room);
      if (errors.length > 0) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Input is not valid.'
        };
      } else {
  
        const saveRoom = await this.roomsRepository.save(room);
        
        if(createRoomDto.type>0) {
          const company = await this.companyRepository.findOne({ where: { id: createRoomDto.type }, relations: ['rooms'] });
          company.rooms.push(saveRoom);
          await this.companyRepository.save(company); 
        }
        
        const user = await this.adminUserRepository.findOne({ where: { id: createRoomDto.user }, relations: ['rooms'] });
        user.rooms.push(saveRoom);
        await this.adminUserRepository.save(user); 
  
        return { status: HttpStatus.OK, item: saveRoom }
      }
    }else{

    }
  }

  async verify(verifyDto: VerifyRoomDto) {
    const room = await this.roomsRepository.findOne({where:{id: verifyDto.id}, relations: ['company']});
    let result = room.password == verifyDto.password;

    if(typeof verifyDto.company !== 'undefined') {
      result = room.company.id === verifyDto.company;
    }

    return result;
  }

  async findAll(company: number) {
    let qb = getRepository(RoomsEntity)
    .createQueryBuilder('rooms')
    .leftJoinAndSelect('rooms.company', 'company')
    .leftJoinAndSelect('rooms.user', 'user')
    .leftJoinAndSelect('rooms.adminuser', 'adminuser')
    const rooms = await qb.getMany();

    var sources = rooms.reduce(function(result, room) {
      if (company==0 || !room.company || room.company.id == company) {
        result.push({...room, password: room.password==""?0:1});
      }
      return result;
    }, []);

    return { items: sources, totalCount: sources.length }
  }

  async findOne(id: number) {
    const room = await this.roomsRepository.findOne({ where: { id: id }, relations: ['company', 'user', 'adminuser'] });
    if (!room) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not a room.'
      };
    }
    return { item : room };
  }

  async findPublicOne(id: number) {
    const room = await this.roomsRepository.findOne({ where: { id: id } });
    if (!room) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not a room.'
      };
    }
    if(room.password == "") room.password = "0";
    else room.password = "1";
    return { item : room };
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    const room = await this.roomsRepository.findOne({ where: { id: id }, relations: ['company'] });
    if (!room) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not Role.'
      }
    }
    let company;
    if(updateRoomDto.type>0){
      company = await this.companyRepository.findOne({id: updateRoomDto.type})

    }
    room.name = updateRoomDto.name;
    room.password = updateRoomDto.password;
    room.company = company;
    
    await this.roomsRepository.update(id, room);
    const updated = await this.roomsRepository.findOne(id);
    return { item : updated };
  }

  async remove(id: number) {
    const room = await this.roomsRepository.findOne({ id: id });
    if (!room) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not a room.'
      }
    }
    return await this.roomsRepository.delete({ id: id });
  }
}
