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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_validator_1 = require("class-validator");
const typeorm_2 = require("typeorm");
const adminuser_entity_1 = require("../adminuser/adminuser.entity");
const roles_entity_1 = require("./roles.entity");
let RolesService = class RolesService {
    constructor(rolesRepository, userRepository) {
        this.rolesRepository = rolesRepository;
        this.userRepository = userRepository;
    }
    async create(createRolesDto) {
        const { name } = createRolesDto;
        const qb = await typeorm_2.getRepository(roles_entity_1.RolesEntity)
            .createQueryBuilder('roles')
            .where('roles.name = :name', { name });
        const role = await qb.getOne();
        if (role) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Role must be unique.'
            };
        }
        let newRole = new roles_entity_1.RolesEntity();
        newRole.code = '';
        newRole.name = createRolesDto.name;
        newRole.description = '';
        const errors = await class_validator_1.validate(newRole);
        if (errors.length > 0) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: errors
            };
        }
        else {
            const savedRole = await this.rolesRepository.save(newRole);
            return { item: savedRole };
        }
    }
    async findAll() {
        const roles = await this.rolesRepository.find();
        return { items: roles, totalCount: roles.length };
    }
    async findOne(id) {
        const role = await this.rolesRepository.findOne({ id: id });
        if (!role) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not Role.'
            };
        }
        return { item: role };
    }
    async update(id, updateRolesDto) {
        const role = await this.rolesRepository.findOne({ id: id });
        if (!role) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not Role.'
            };
        }
        await this.rolesRepository.update(id, updateRolesDto);
        const updated = await this.rolesRepository.findOne({ id: id });
        return { item: updated };
    }
    async remove(id) {
        const role = await this.rolesRepository.findOne({ id: id });
        if (!role) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not Role.'
            };
        }
        return await this.rolesRepository.delete({ id: id });
    }
};
RolesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(roles_entity_1.RolesEntity)),
    __param(1, typeorm_1.InjectRepository(adminuser_entity_1.AdminuserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RolesService);
exports.RolesService = RolesService;
//# sourceMappingURL=roles.service.js.map