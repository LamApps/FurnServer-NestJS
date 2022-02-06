"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const screen_entity_1 = require("./screen.entity");
let ScreenService = class ScreenService {
    constructor(screenRepository, userRepository) {
        this.screenRepository = screenRepository;
        this.userRepository = userRepository;
    }
    async findAll(query) {
        const qb = await typeorm_2.getRepository(screen_entity_1.ScreenEntity)
            .createQueryBuilder('screen')
            .leftJoinAndSelect('screen.user', 'user');
        qb.where("1 = 1");
        if ('user' in query) {
            const user = await this.userRepository.findOne({ id: query.user });
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
        return { screens, count };
    }
    async findOne(where) {
        const screen = await this.screenRepository.findOne(where);
        return { screen };
    }
    async addScreen(params, photo) {
        let user = await this.userRepository.findOne(params.user, { select: ['id', 'username'] });
        const screen = new screen_entity_1.ScreenEntity();
        screen.device = params.device;
        screen.photo = photo.filename;
        screen.user = user;
        await this.screenRepository.save(screen);
        return { screen };
    }
};
ScreenService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(screen_entity_1.ScreenEntity)),
    __param(1, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ScreenService);
exports.ScreenService = ScreenService;
//# sourceMappingURL=screen.service.js.map