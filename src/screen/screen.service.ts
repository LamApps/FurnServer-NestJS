import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ScreenEntity } from './screen.entity';
import { ScreenRO, ScreensRO } from './screen.interface';

@Injectable()
export class ScreenService {
    constructor(
        @InjectRepository(ScreenEntity)
        private readonly screenRepository: Repository<ScreenEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async findAll(query): Promise<ScreensRO> {
        const qb = await getRepository(ScreenEntity)
        .createQueryBuilder('screen')
        .leftJoinAndSelect('screen.user', 'user');

        qb.where("1 = 1");
        if ('user' in query) {
            const user = await this.userRepository.findOne({id: query.user});
            qb.andWhere("screen.user = :id", { id: user.id });
        }
        
        if ('startTime' in query) {
            qb.andWhere("created >= :startTime", { startTime: query.startTime });
        }

        if ('endTime' in query) {
            qb.andWhere("created < :endTime", { endTime: query.endTime });
        }

        qb.orderBy('screen.created', 'ASC');
        if ('limit' in query) {
            qb.limit(query.limit);
        }
      
        if ('offset' in query) {
            qb.offset(query.offset);
        }

        const screens = await qb.getMany();
        const count = await screens.length;

        return { screens, count }
    }

    async findOne(where): Promise<ScreenRO> {
        const screen = await this.screenRepository.findOne(where);
        return { screen };
    }

    async addScreen(params, photo): Promise<ScreenRO | UserEntity | undefined> {
        let user = await this.userRepository.findOne(params.user, { select: ['id', 'username'] });

        const screen = new ScreenEntity();
        screen.device = params.device;
        screen.photo = photo.filename;
        screen.user = user
    
        await this.screenRepository.save(screen);
        return { screen }
      }
}
