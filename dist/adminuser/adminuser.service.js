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
exports.AdminuserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const adminuser_entity_1 = require("./adminuser.entity");
const jwt = require('jsonwebtoken');
const config_1 = require("../config");
const class_validator_1 = require("class-validator");
const http_exception_1 = require("@nestjs/common/exceptions/http.exception");
const common_2 = require("@nestjs/common");
const argon2 = require("argon2");
const roles_entity_1 = require("../roles/roles.entity");
let AdminuserService = class AdminuserService {
    constructor(userRepository, rolesRepository) {
        this.userRepository = userRepository;
        this.rolesRepository = rolesRepository;
    }
    async findAll() {
        const qb = await typeorm_2.getRepository(adminuser_entity_1.AdminuserEntity)
            .createQueryBuilder('adminuser')
            .leftJoinAndSelect('adminuser.roles', 'roles');
        const users = await qb.getMany();
        return { items: users, totalCount: users.length };
    }
    async find(id) {
        const qb = await typeorm_2.getRepository(adminuser_entity_1.AdminuserEntity)
            .createQueryBuilder('adminuser')
            .leftJoinAndSelect('adminuser.roles', 'roles');
        const user = await qb.where({ id: id }).getOne();
        user.role = user.roles.name.toLowerCase();
        user.email = user.email;
        if (!user) {
            return {
                status: common_2.HttpStatus.BAD_REQUEST,
                message: 'There is not user.'
            };
        }
        return { item: user };
    }
    async findOne({ username, password }) {
        const qb = await typeorm_2.getRepository(adminuser_entity_1.AdminuserEntity)
            .createQueryBuilder('adminuser')
            .leftJoinAndSelect('adminuser.roles', 'roles');
        const user = await qb.where({ username: username }).getOne();
        if (!user) {
            return null;
        }
        user.role = user.roles.name.toLowerCase();
        user.email = user.email;
        if (await argon2.verify(user.password, password)) {
            return user;
        }
        return null;
    }
    async create(dto) {
        const { username, email, password, position, firstname, lastname, role, birthday, active, mobile } = dto;
        const qb = await typeorm_2.getRepository(adminuser_entity_1.AdminuserEntity)
            .createQueryBuilder('adminuser')
            .where('adminuser.username = :username', { username })
            .orWhere('adminuser.email = :email', { email });
        const user = await qb.getOne();
        if (user) {
            return {
                status: common_2.HttpStatus.BAD_REQUEST,
                message: 'Username and email must be unique.'
            };
        }
        let newUser = new adminuser_entity_1.AdminuserEntity();
        newUser.username = username;
        newUser.email = email;
        newUser.password = password;
        newUser.active = active;
        newUser.role = role;
        newUser.firstname = firstname;
        newUser.lastname = lastname;
        newUser.position = position;
        newUser.birthday = birthday;
        newUser.mobile = mobile;
        const errors = await class_validator_1.validate(newUser);
        if (errors.length > 0) {
            return {
                status: common_2.HttpStatus.BAD_REQUEST,
                message: 'Userinput is not valid.'
            };
        }
        else {
            const savedUser = await this.userRepository.save(newUser);
            const roles = await this.rolesRepository.findOne({ where: { id: dto.roles }, relations: ['adminusers'] });
            roles.adminusers.push(newUser);
            await this.rolesRepository.save(roles);
            return { user: savedUser };
        }
    }
    async update(id, dto) {
        let user = await this.userRepository.findOne(id);
        if (!user) {
            return {
                status: common_2.HttpStatus.BAD_REQUEST,
                message: 'There is not user.'
            };
        }
        user.role = dto.role;
        user.birthday = dto.birthday;
        user.firstname = dto.firstname;
        user.lastname = dto.lastname;
        user.position = dto.position;
        user.email = dto.email;
        user.active = dto.active;
        user.chat_alert = dto.chatalert;
        user.sound = dto.sound;
        user.alert_fadetime = dto.alert_fadetime;
        if (dto.mobile && dto.mobile != "") {
            user.mobile = dto.mobile;
        }
        if (dto.photo && dto.photo != "") {
            user.photo = dto.photo;
        }
        if (dto.password && dto.password !== "") {
            user.password = await argon2.hash(dto.password);
        }
        await this.userRepository.update(id, user);
        const updated = await this.userRepository.findOne(id);
        return { item: updated };
    }
    async remove(id) {
        const user = await this.userRepository.findOne({ id: id });
        if (!user) {
            return {
                status: common_2.HttpStatus.BAD_REQUEST,
                message: 'There is not user.'
            };
        }
        return await this.userRepository.delete({ id: id });
    }
    async findById(id) {
        const user = await this.userRepository.findOne(id);
        if (!user) {
            const errors = { User: 'admin user not found' };
            throw new http_exception_1.HttpException({ errors }, 401);
        }
        return this.buildUserRO(user);
    }
    async findByEmail(email) {
        const user = await this.userRepository.findOne({ email: email });
        return this.buildUserRO(user);
    }
    async update_login(id, token) {
        let user = await this.userRepository.findOne(id);
        user.token = token;
        await this.userRepository.update(id, user);
        return await this.find(id);
    }
    generateJWT(user) {
        return jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            exp: new Date().getTime() / 1000 + 12 * 3600,
            isAdmin: true,
        }, config_1.SECRET);
    }
    ;
    buildUserRO(user) {
        const userRO = {
            id: user.id,
            username: user.username,
            email: user.email,
            token: this.generateJWT(user),
            role: user.role,
            active: user.active,
        };
        return { user: userRO };
    }
};
AdminuserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(adminuser_entity_1.AdminuserEntity)),
    __param(1, typeorm_1.InjectRepository(roles_entity_1.RolesEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AdminuserService);
exports.AdminuserService = AdminuserService;
//# sourceMappingURL=adminuser.service.js.map