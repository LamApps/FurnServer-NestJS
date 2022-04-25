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
exports.UuidService = void 0;
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
    async create(createUuidDto) {
        const qb = await typeorm_2.getRepository(uuid_entity_1.UUIDEntity)
            .createQueryBuilder('uuid')
            .where('uuid.uuid = :uuid', { uuid: createUuidDto.uuid });
        const uuid = await qb.getOne();
        if (uuid) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'UUID must be unique.'
            };
        }
        const qb1 = await typeorm_2.getRepository(uuid_entity_1.UUIDEntity)
            .createQueryBuilder('uuid')
            .leftJoinAndSelect('uuid.company', 'company')
            .where('uuid.unique_id = :unique_id', { unique_id: createUuidDto.unique_id })
            .andWhere('company.id = :company', { company: createUuidDto.company });
        const uuid1 = await qb1.getOne();
        if (uuid1) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Unique ID must be unique.'
            };
        }
        let newUuid = new uuid_entity_1.UUIDEntity();
        newUuid.unique_id = createUuidDto.unique_id;
        newUuid.uuid = createUuidDto.uuid;
        newUuid.description = createUuidDto.description;
        newUuid.last_date_verified = createUuidDto.last_date_verified;
        newUuid.version = createUuidDto.version;
        newUuid.active = createUuidDto.active;
        const errors = await class_validator_1.validate(newUuid);
        if (errors.length > 0) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Input is not valid.'
            };
        }
        else {
            const savedUuid = await this.uuidRepository.save(newUuid);
            const company = await this.companyRepository.findOne({ where: { id: createUuidDto.company }, relations: ['uuids'] });
            company.uuids.push(savedUuid);
            await this.companyRepository.save(company);
            return { status: common_1.HttpStatus.OK, item: savedUuid };
        }
    }
    async getLatestUniqueId(company) {
        const uuids = await typeorm_2.getRepository(uuid_entity_1.UUIDEntity)
            .createQueryBuilder('uuid')
            .leftJoinAndSelect('uuid.company', 'company')
            .where('company.id = :id', { id: company }).getMany();
        for (let unique_id = 1; unique_id < 1000; unique_id++) {
            let exist = false;
            uuids.forEach(item => {
                if (item.unique_id == ('000' + unique_id).substr(-3)) {
                    exist = true;
                }
            });
            if (!exist) {
                return { id: unique_id };
            }
        }
    }
    async findAll(company) {
        const qb = await typeorm_2.getRepository(uuid_entity_1.UUIDEntity)
            .createQueryBuilder('uuid')
            .leftJoinAndSelect('uuid.company', 'company')
            .where('company.id = :id', { id: company });
        const uuids = await qb.getMany();
        return { items: uuids, totalCount: uuids.length };
    }
    async findOne(id) {
        const uuid = await this.uuidRepository.findOne({ id: id });
        if (!uuid) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not uuid.'
            };
        }
        return { item: uuid };
    }
    async update(id, updateUuidDto) {
        const qb = await typeorm_2.getRepository(uuid_entity_1.UUIDEntity)
            .createQueryBuilder('uuid')
            .where('uuid.unique_id = :unique_id', { unique_id: updateUuidDto.unique_id });
        const orig_uuid = await qb.getOne();
        console.log(orig_uuid, id);
        if (orig_uuid && orig_uuid.id != id) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Unique ID must be unique.'
            };
        }
        let uuid = await this.uuidRepository.findOne(id);
        if (!uuid) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not uuid.'
            };
        }
        uuid.unique_id = updateUuidDto.unique_id;
        uuid.last_date_verified = updateUuidDto.last_date_verified;
        uuid.description = updateUuidDto.description;
        uuid.version = updateUuidDto.version;
        uuid.active = updateUuidDto.active;
        await this.uuidRepository.update(id, uuid);
        const updated = await this.uuidRepository.findOne({ id: id });
        return { item: updated };
    }
    async remove(id) {
        const uuid = await this.uuidRepository.findOne({ id: id });
        if (!uuid) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not uuid.'
            };
        }
        return await this.uuidRepository.delete({ id: id });
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