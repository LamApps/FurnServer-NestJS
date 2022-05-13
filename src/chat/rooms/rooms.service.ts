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
import { RoomBannedUsersEntity } from './entities/room_banned_users';
import { RoomLogEntity } from './entities/room-log.entity';

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
    private readonly adminUserRepository: Repository<AdminuserEntity>,
    @InjectRepository(RoomBannedUsersEntity)
    private readonly bannedRepository: Repository<RoomBannedUsersEntity>,
    @InjectRepository(RoomLogEntity)
    private readonly logRepository: Repository<RoomLogEntity>

  ) {}

  async create(createRoomDto: CreateRoomDto) {
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

      if(createRoomDto.flag===1){
        const user = await this.adminUserRepository.findOne({ where: { id: createRoomDto.user }, relations: ['rooms'] });
        user.rooms.push(saveRoom);
        await this.adminUserRepository.save(user); 
      }else{
        const user = await this.userRepository.findOne({ where: { id: createRoomDto.user }, relations: ['rooms'] });
        user.rooms.push(saveRoom);
        await this.userRepository.save(user); 
      }
      return { status: HttpStatus.OK, item: saveRoom }
    }
  }

  async verify(verifyDto: VerifyRoomDto) {
    const room = await this.roomsRepository.findOne({where:{id: verifyDto.id}, relations: ['company']});
    let result = room.password == verifyDto.password;

    if(typeof verifyDto.company !== 'undefined' && room.company) {
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
    const room = await this.roomsRepository
    .createQueryBuilder('room')
    .leftJoin('room.company', 'company')
    .leftJoin('room.user', 'user')
    .leftJoin('room.adminuser', 'adminuser')
    .addSelect(['company'])
    .addSelect(['user.id','user.firstname','user.lastname','user.photo','user.company'])
    .addSelect(['adminuser.id','adminuser.firstname','adminuser.lastname','adminuser.photo'])
    .where('room.id = :id', {id: id})
    .getOne();

    // const room = await this.roomsRepository.findOne({ where: { id: id }, relations: ['company', 'user', 'adminuser'] });
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

  async getLog(id: number) {
    const room = await this.roomsRepository
    .createQueryBuilder('room')
    .leftJoin('room.logs', 'logs')
    .leftJoin('logs.sender', 'sender')
    .leftJoin('logs.sender_admin', 'sender_admin')
    .addSelect(['logs'])
    .addSelect(['sender.firstname', 'sender.lastname', 'sender.photo'])
    .addSelect(['sender_admin.firstname', 'sender_admin.lastname', 'sender_admin.photo'])
    .where('room.id = :id', {id: id})
    .getOne();

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

  async getBannedUsers(roomId: number) {
    return await this.bannedRepository
    .createQueryBuilder('banned')
    .leftJoin('banned.room', 'room')
    .leftJoin('banned.user', 'user')
    .leftJoin('banned.adminuser', 'adminuser')
    .leftJoin('user.company', 'company')
    .addSelect(['user.id','user.firstname','user.lastname','user.photo'])
    .addSelect(['company'])
    .addSelect(['adminuser.id','adminuser.firstname','adminuser.lastname','adminuser.photo'])
    .where('room.id = :id', {id: roomId})
    .getMany();
  }

  async saveRoomChatLog(sender:any, room: string, message: string) {
    const roomId = room.split('_')[1];
    let log = new RoomLogEntity();
    log.message = message;
    const saveLog = await this.logRepository.save(log);

    const rooms = await this.roomsRepository.findOne({ where: { id: roomId }, relations: ['logs'] });
    rooms.logs.push(saveLog);
    await this.roomsRepository.save(rooms); 

    if(sender.company==='Admin') {
      const chat_log = await this.adminUserRepository.findOne({ where: { id: sender.userId }, relations: ['room_logs'] });
      chat_log.room_logs.push(saveLog);
      await this.adminUserRepository.save(chat_log); 
    }else{
      const chat_log = await this.userRepository.findOne({ where: { id: sender.userId }, relations: ['room_logs'] });
      chat_log.room_logs.push(saveLog);
      await this.userRepository.save(chat_log); 
    }
  }

  async removeBannedUsers(roomid:number) {
    const room = await this.bannedRepository.findOne({ id: roomid });
    if (!room) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not a banned user.'
      }
    }
    return await this.bannedRepository.delete({ id: roomid });
  }

  async banUser(room:string, data:any) {
    const roomId = room.split('_')[1];
    let qb = this.bannedRepository
    .createQueryBuilder('banned')
    .leftJoin('banned.room', 'room')
    .leftJoin('banned.user', 'user')
    .leftJoin('banned.adminuser', 'adminuser')
    .where('room.id = :id', {id: roomId});
    if(data.company=='Admin') qb = qb.andWhere('adminuser.id = :adminid', {adminid: data.userId})
    else qb = qb.andWhere('user.id = :userid', {userid: data.userId})
    const isExist = await qb.getCount();

    if(isExist==0){
      const entity = new RoomBannedUsersEntity();
      const saveBanned = await this.bannedRepository.save(entity);
  
      const ban_room = await this.roomsRepository.findOne({ where: { id: roomId }, relations: ['bans'] });
      ban_room.bans.push(saveBanned);
      await this.roomsRepository.save(ban_room); 
  
      if(data.company=='Admin'){
        const user = await this.adminUserRepository.findOne({ where: { id: data.userId }, relations: ['banned_users'] });
        user.banned_users.push(saveBanned);
        await this.adminUserRepository.save(user); 
      }else{
        const user = await this.userRepository.findOne({ where: { id: data.userId }, relations: ['banned_users'] });
        user.banned_users.push(saveBanned);
        await this.userRepository.save(user); 
      }
    }
  }
}
