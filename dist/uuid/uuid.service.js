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
const company_entity_1 = require("../company/company.entity");
const uuid_entity_1 = require("./uuid.entity");
let UuidService = class UuidService {
    constructor(uuidRepository, companyRepository) {
        this.uuidRepository = uuidRepository;
        this.companyRepository = companyRepository;
    }
    create(createUuidDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const qb = yield typeorm_2.getRepository(uuid_entity_1.UUIDEntity)
                .createQueryBuilder('uuid')
                .where('uuid.uuid = :uuid', { uuid: createUuidDto.uuid });
            const uuid = yield qb.getOne();
            if (uuid) {
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'UUID must be unique.'
                };
            }
            let newUuid = new uuid_entity_1.UUIDEntity();
            newUuid.uuid = createUuidDto.uuid;
            newUuid.description = createUuidDto.description;
            newUuid.last_date_verified = createUuidDto.last_date_verified;
            newUuid.version = createUuidDto.version;
            newUuid.active = createUuidDto.active;
            const errors = yield class_validator_1.validate(newUuid);
            if (errors.length > 0) {
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'Input is not valid.'
                };
            }
            else {
                const savedUuid = yield this.uuidRepository.save(newUuid);
                const company = yield this.companyRepository.findOne({ where: { id: createUuidDto.company }, relations: ['uuids'] });
                company.uuids.push(savedUuid);
                yield this.companyRepository.save(company);
                return { status: common_1.HttpStatus.OK, item: savedUuid };
            }
        });
    }
    findAll(company) {
        return __awaiter(this, void 0, void 0, function* () {
            const qb = yield typeorm_2.getRepository(uuid_entity_1.UUIDEntity)
                .createQueryBuilder('uuid')
                .leftJoinAndSelect('uuid.company', 'company')
                .where('company.id = :id', { id: company });
            const uuids = yield qb.getMany();
            return { items: uuids, totalCount: uuids.length };
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const uuid = yield this.uuidRepository.findOne({ id: id });
            if (!uuid) {
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'There is not uuid.'
                };
            }
            return { item: uuid };
        });
    }
    update(id, updateUuidDto) {
        return __awaiter(this, void 0, void 0, function* () {
            let uuid = yield this.uuidRepository.findOne(id);
            if (!uuid) {
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'There is not uuid.'
                };
            }
            uuid.last_date_verified = updateUuidDto.last_date_verified;
            uuid.description = updateUuidDto.description;
            uuid.version = updateUuidDto.version;
            uuid.active = updateUuidDto.active;
            yield this.uuidRepository.update(id, uuid);
            const updated = yield this.uuidRepository.findOne({ id: id });
            return { item: updated };
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const uuid = yield this.uuidRepository.findOne({ id: id });
            if (!uuid) {
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'There is not uuid.'
                };
            }
            return yield this.uuidRepository.delete({ id: id });
        });
    }
};
UuidService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(uuid_entity_1.UUIDEntity)),
    __param(1, typeorm_1.InjectRepository(company_entity_1.CompanyEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UuidService);
exports.UuidService = UuidService;
//# sourceMappingURL=uuid.service.js.map