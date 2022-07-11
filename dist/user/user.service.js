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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const jwt = require('jsonwebtoken');
const config_1 = require("../config");
const class_validator_1 = require("class-validator");
const http_exception_1 = require("@nestjs/common/exceptions/http.exception");
const common_2 = require("@nestjs/common");
const argon2 = require("argon2");
const company_entity_1 = require("../company/company.entity");
const company_role_entity_1 = require("../company-role/company-role.entity");
const role_menu_entity_1 = require("../company-role/role-menu.entity");
let UserService = class UserService {
    constructor(userRepository, companyRepository) {
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
    }
    async findAll() {
        const qb = await typeorm_2.getRepository(user_entity_1.UserEntity)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.company', 'company')
            .leftJoinAndSelect('user.role', 'role')
            .leftJoinAndSelect('role.menus', 'menus')
            .leftJoinAndSelect('menus.menu', 'menu')
            .where('deleted = false');
        const users = await qb.getMany();
        return { items: users, totalCount: users.length };
    }
    async find(id) {
        const qb = await typeorm_2.getRepository(user_entity_1.UserEntity)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.company', 'company')
            .leftJoinAndSelect('user.role', 'role')
            .leftJoinAndSelect('role.menus', 'menus')
            .leftJoinAndSelect('menus.menu', 'menu')
            .where('deleted = false');
        const user = await qb.where({ id: id }).getOne();
        if (!user) {
            return {
                status: common_2.HttpStatus.BAD_REQUEST,
                message: 'There is not user.'
            };
        }
        return { item: user };
    }
    async findAllLimited(company) {
        const qb = await typeorm_2.getRepository(user_entity_1.UserEntity)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.company', 'company')
            .leftJoinAndSelect('user.role', 'role')
            .leftJoinAndSelect('role.menus', 'menus')
            .leftJoinAndSelect('menus.menu', 'menu')
            .where('deleted = false')
            .andWhere('user.company = :company', { company });
        const users = await qb.getMany();
        return { items: users, totalCount: users.length };
    }
    async findOne({ username, password, company }) {
        const qb = await typeorm_2.getRepository(user_entity_1.UserEntity)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.company', 'company')
            .leftJoinAndSelect('user.role', 'role')
            .leftJoinAndSelect('role.menus', 'menus')
            .leftJoinAndSelect('menus.menu', 'menu')
            .where('deleted = false');
        const user = await qb.where({ username: username }).andWhere('LOWER(company.code) = :company', { company: company.toLowerCase() }).getOne();
        if (!user) {
            return null;
        }
        if (await argon2.verify(user.password, password)) {
            return user;
        }
        return null;
    }
    async getDatabase(username, company) {
        const qb = await typeorm_2.getRepository(user_entity_1.UserEntity)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.company', 'company');
        const user = await qb.where({ username: username }).andWhere('LOWER(company.code) = :company', { company: company.toLowerCase() }).getOne();
        if (!user) {
            return {
                status: common_2.HttpStatus.BAD_REQUEST,
                message: 'There is not user.'
            };
        }
        else {
            let database = user.database;
            if (database == undefined || database == "")
                database = "1";
            let default_database = user.default_database;
            if (default_database == undefined || default_database == "")
                default_database = "1";
            return {
                status: common_2.HttpStatus.OK,
                result: {
                    database: database,
                    default_database: default_database
                }
            };
        }
    }
    async create(dto) {
        const { username, email, password, position, firstname, lastname, role, birthday, active, mobile, timeout } = dto;
        const qb = await typeorm_2.getRepository(user_entity_1.UserEntity)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.company', 'company')
            .where('user.username = :username', { username });
        const user = await qb.andWhere('company.id = :company', { company: dto.company }).getOne();
        if (user) {
            return {
                status: common_2.HttpStatus.BAD_REQUEST,
                message: 'Username must be unique.'
            };
        }
        let newUser = new user_entity_1.UserEntity();
        newUser.username = username;
        newUser.email = email;
        newUser.password = password;
        newUser.active = active;
        newUser.firstname = firstname;
        newUser.lastname = lastname;
        newUser.position = position;
        newUser.birthday = birthday;
        newUser.mobile = mobile;
        newUser.database = dto.database;
        newUser.default_database = dto.default_database;
        if (timeout) {
            newUser.timeout = timeout;
        }
        const errors = await class_validator_1.validate(newUser);
        if (errors.length > 0) {
            return {
                status: common_2.HttpStatus.BAD_REQUEST,
                message: 'Userinput is not valid.'
            };
        }
        else {
            const savedUser = await this.userRepository.save(newUser);
            const company = await this.companyRepository.findOne({ where: { id: dto.company }, relations: ['users'] });
            company.users.push(savedUser);
            await this.companyRepository.save(company);
            if (role != -1) {
                const company_role = await typeorm_2.getRepository(company_role_entity_1.CompanyRoleEntity)
                    .createQueryBuilder('company_role')
                    .leftJoinAndSelect('company_role.users', 'users')
                    .leftJoinAndSelect('company_role.menus', 'menus')
                    .leftJoinAndSelect('menus.menu', 'menu')
                    .where('company_role.id = :id', { id: role })
                    .getOne();
                if (company_role) {
                    company_role.users.push(newUser);
                    await typeorm_2.getRepository(company_role_entity_1.CompanyRoleEntity).save(company_role);
                    const dto = company_role.menus.map(menu => {
                        return Object.assign(Object.assign({}, menu), { id: menu.menu.id });
                    });
                    await this.updatePermission(savedUser.id, -2, dto);
                }
            }
            return { status: common_2.HttpStatus.OK, user: savedUser };
        }
    }
    async update_login(id, dto, token) {
        let user = await this.userRepository.findOne(id);
        user.ip_address = dto.ip_address;
        user.last_login_database = dto.last_login_database;
        user.last_login_date = dto.last_login_date;
        user.last_login_time = dto.last_login_time;
        user.operating_system = dto.operating_system;
        user.browser = dto.browser;
        user.token = token;
        await this.userRepository.update(id, user);
        const qb = await typeorm_2.getRepository(user_entity_1.UserEntity)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.company', 'company')
            .leftJoinAndSelect('user.role', 'role')
            .leftJoinAndSelect('role.menus', 'menus')
            .leftJoinAndSelect('menus.menu', 'menu')
            .where({ id: id });
        const updated = await qb.getOne();
        return updated;
    }
    async update(id, dto) {
        const user = await typeorm_2.getRepository(user_entity_1.UserEntity)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.company', 'company')
            .leftJoinAndSelect('user.role', 'role')
            .leftJoinAndSelect('role.menus', 'menus')
            .leftJoinAndSelect('menus.menu', 'menu')
            .where('user.id = :id', { id: id })
            .getOne();
        if (!user) {
            return {
                status: common_2.HttpStatus.BAD_REQUEST,
                message: 'There is not user.'
            };
        }
        user.birthday = dto.birthday;
        user.firstname = dto.firstname;
        user.lastname = dto.lastname;
        user.position = dto.position;
        user.email = dto.email;
        user.photo = dto.photo;
        user.active = dto.active;
        if (dto.chatalert)
            user.chat_alert = dto.chatalert;
        if (dto.sound)
            user.sound = dto.sound;
        if (dto.alert_fadetime)
            user.alert_fadetime = dto.alert_fadetime;
        if (dto.default_status)
            user.default_status = dto.default_status;
        user.mobile = dto.mobile;
        if (dto.timeout) {
            user.timeout = dto.timeout;
        }
        if (dto.database) {
            user.database = dto.database;
        }
        if (dto.default_database) {
            user.default_database = dto.default_database;
        }
        if (dto.password && dto.password !== "") {
            user.password = await argon2.hash(dto.password);
        }
        let saved = await this.userRepository.save(user);
        if (user.role) {
            const company_role = await typeorm_2.getRepository(company_role_entity_1.CompanyRoleEntity)
                .createQueryBuilder('company_role')
                .leftJoinAndSelect('company_role.users', 'users')
                .where('company_role.id = :id', { id: user.role.id })
                .getOne();
            if (company_role) {
                company_role.users = company_role.users.filter(role => {
                    return role.id !== user.role.id;
                });
                await typeorm_2.getRepository(company_role_entity_1.CompanyRoleEntity).save(company_role);
            }
        }
        if (dto.role != -1) {
            const company_role = await typeorm_2.getRepository(company_role_entity_1.CompanyRoleEntity)
                .createQueryBuilder('company_role')
                .leftJoinAndSelect('company_role.users', 'users')
                .leftJoinAndSelect('company_role.menus', 'menus')
                .leftJoinAndSelect('menus.menu', 'menu')
                .where('company_role.id = :id', { id: dto.role })
                .getOne();
            if (company_role) {
                company_role.users.push(user);
                await typeorm_2.getRepository(company_role_entity_1.CompanyRoleEntity).save(company_role);
                const dto = company_role.menus.map(menu => {
                    return Object.assign(Object.assign({}, menu), { id: menu.menu.id });
                });
                await this.updatePermission(user.id, -2, dto);
            }
        }
        return { item: saved };
    }
    async remove(id) {
        const user = await this.userRepository.findOne({ id: id });
        if (!user) {
            return {
                status: common_2.HttpStatus.BAD_REQUEST,
                message: 'There is not user.'
            };
        }
        return await this.userRepository.update(id, { deleted: true });
    }
    async findById(id) {
        const user = await this.userRepository.findOne(id);
        if (!user) {
            const errors = { User: ' not found' };
            throw new http_exception_1.HttpException({ errors }, 401);
        }
        return this.buildUserRO(user);
    }
    async findByEmail(email) {
        const user = await this.userRepository.findOne({ email: email });
        return this.buildUserRO(user);
    }
    async updatePermission(id, role, dto) {
        var user = await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.role', 'role')
            .where('user.id=:id', { id: id })
            .getOne();
        if (!user) {
            return {
                status: common_2.HttpStatus.BAD_REQUEST,
                message: 'There is not company.'
            };
        }
        for (let i = 0; i < dto.length; i++) {
            const one = dto[i];
            const permission = one.permission;
            await typeorm_2.getRepository(role_menu_entity_1.RoleMenuEntity)
                .createQueryBuilder()
                .update({ permission: permission })
                .where('menuId=:id', { id: one.id })
                .andWhere('roleId=:rid', { rid: role })
                .execute();
        }
        if (user.role && role != -2) {
            const company_role = await typeorm_2.getRepository(company_role_entity_1.CompanyRoleEntity)
                .createQueryBuilder('company_role')
                .leftJoinAndSelect('company_role.users', 'users')
                .where('company_role.id = :id', { id: user.role.id })
                .getOne();
            if (company_role) {
                company_role.users = company_role.users.filter(role => {
                    return role.id !== user.role.id;
                });
                await typeorm_2.getRepository(company_role_entity_1.CompanyRoleEntity).save(company_role);
            }
        }
        if (role > 0) {
            const company_role = await typeorm_2.getRepository(company_role_entity_1.CompanyRoleEntity)
                .createQueryBuilder('company_role')
                .leftJoinAndSelect('company_role.users', 'users')
                .where('company_role.id = :id', { id: role })
                .getOne();
            if (company_role) {
                company_role.users.push(user);
                await typeorm_2.getRepository(company_role_entity_1.CompanyRoleEntity).save(company_role);
            }
        }
        const updated = await this.find(id);
        return { user: updated };
    }
    generateJWT(user) {
        return jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            exp: new Date().getTime() / 1000 + 12 * 3600,
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
            company: user.company,
            active: user.active,
        };
        return { user: userRO };
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __param(1, typeorm_1.InjectRepository(company_entity_1.CompanyEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map