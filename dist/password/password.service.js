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
exports.PasswordService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_validator_1 = require("class-validator");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const password_entity_1 = require("./password.entity");
let PasswordService = class PasswordService {
    constructor(passwordRepository, userRepository) {
        this.passwordRepository = passwordRepository;
        this.userRepository = userRepository;
    }
    async create(createPasswordDto) {
        const { code } = createPasswordDto;
        const qb = await typeorm_2.getRepository(password_entity_1.PasswordEntity)
            .createQueryBuilder('password')
            .where('password.code = :code', { code });
        const company = await qb.getOne();
        if (company) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Code must be unique.'
            };
        }
        let newPassword = new password_entity_1.PasswordEntity();
        newPassword.code = createPasswordDto.code;
        newPassword.name = createPasswordDto.name;
        newPassword.description = createPasswordDto.description;
        const errors = await class_validator_1.validate(newPassword);
        if (errors.length > 0) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: errors
            };
        }
        else {
            const savedPassword = await this.passwordRepository.save(newPassword);
            return { item: savedPassword };
        }
    }
    async findAll() {
        const passwords = await this.passwordRepository.find();
        return { items: passwords, totalCount: passwords.length };
    }
    async findOne(id) {
        const password = await this.passwordRepository.findOne({ id: id });
        if (!password) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not password.'
            };
        }
        return { item: password };
    }
    async update(id, updatePasswordDto) {
        const password = await this.passwordRepository.findOne({ id: id });
        if (!password) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not password.'
            };
        }
        await this.passwordRepository.update(id, updatePasswordDto);
        const updated = await this.passwordRepository.findOne({ id: id });
        return { item: updated };
    }
    async remove(id) {
        const password = await this.passwordRepository.findOne({ id: id });
        if (!password) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not password.'
            };
        }
        return await this.passwordRepository.delete({ id: id });
    }
};
PasswordService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(password_entity_1.PasswordEntity)),
    __param(1, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PasswordService);
exports.PasswordService = PasswordService;
//# sourceMappingURL=password.service.js.map