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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
    create(createPasswordDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { code } = createPasswordDto;
            const qb = yield typeorm_2.getRepository(password_entity_1.PasswordEntity)
                .createQueryBuilder('password')
                .where('password.code = :code', { code });
            const company = yield qb.getOne();
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
            const errors = yield class_validator_1.validate(newPassword);
            if (errors.length > 0) {
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: errors
                };
            }
            else {
                const savedPassword = yield this.passwordRepository.save(newPassword);
                return { item: savedPassword };
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const passwords = yield this.passwordRepository.find();
            return { items: passwords, totalCount: passwords.length };
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = yield this.passwordRepository.findOne({ id: id });
            if (!password) {
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'There is not password.'
                };
            }
            return { item: password };
        });
    }
    update(id, updatePasswordDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = yield this.passwordRepository.findOne({ id: id });
            if (!password) {
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'There is not password.'
                };
            }
            yield this.passwordRepository.update(id, updatePasswordDto);
            const updated = yield this.passwordRepository.findOne({ id: id });
            return { item: updated };
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = yield this.passwordRepository.findOne({ id: id });
            if (!password) {
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'There is not password.'
                };
            }
            return yield this.passwordRepository.delete({ id: id });
        });
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