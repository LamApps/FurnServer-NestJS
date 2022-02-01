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
const adminuser_entity_1 = require("../adminuser/adminuser.entity");
const roles_entity_1 = require("./roles.entity");
let RolesService = class RolesService {
    constructor(rolesRepository, userRepository) {
        this.rolesRepository = rolesRepository;
        this.userRepository = userRepository;
    }
    create(createRolesDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = createRolesDto;
            const qb = yield typeorm_2.getRepository(roles_entity_1.RolesEntity)
                .createQueryBuilder('roles')
                .where('roles.name = :name', { name });
            let newPassword = new roles_entity_1.RolesEntity();
            newPassword.code = '';
            newPassword.name = createRolesDto.name;
            newPassword.description = '';
            const errors = yield class_validator_1.validate(newPassword);
            if (errors.length > 0) {
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: errors
                };
            }
            else {
                const savedPassword = yield this.rolesRepository.save(newPassword);
                return { item: savedPassword };
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const roles = yield this.rolesRepository.find();
            return { items: roles, totalCount: roles.length };
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = yield this.rolesRepository.findOne({ id: id });
            if (!password) {
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'There is not Role.'
                };
            }
            return { item: password };
        });
    }
    update(id, updateRolesDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = yield this.rolesRepository.findOne({ id: id });
            if (!password) {
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'There is not Role.'
                };
            }
            yield this.rolesRepository.update(id, updateRolesDto);
            const updated = yield this.rolesRepository.findOne({ id: id });
            return { item: updated };
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = yield this.rolesRepository.findOne({ id: id });
            if (!password) {
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'There is not Role.'
                };
            }
            return yield this.rolesRepository.delete({ id: id });
        });
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