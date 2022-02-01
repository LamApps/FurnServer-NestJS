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
const password_entity_1 = require("../password/password.entity");
const company_entity_1 = require("./company.entity");
let CompanyService = class CompanyService {
    constructor(companyRepository, passwordRepository) {
        this.companyRepository = companyRepository;
        this.passwordRepository = passwordRepository;
    }
    create(createCompanyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, app_id } = createCompanyDto;
            const qb = yield typeorm_2.getRepository(company_entity_1.CompanyEntity)
                .createQueryBuilder('company')
                .where('company.name = :name', { name })
                .orWhere('company.app_id = :app_id', { app_id });
            const company = yield qb.getOne();
            if (company) {
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'Name must be unique.'
                };
            }
            let newCompany = new company_entity_1.CompanyEntity();
            newCompany.app_id = app_id;
            newCompany.name = name;
            newCompany.expire_date = createCompanyDto.expire_date;
            newCompany.first_time_status = createCompanyDto.first_time_status;
            newCompany.menu_password = createCompanyDto.menu_password;
            newCompany.active = createCompanyDto.active;
            const errors = yield class_validator_1.validate(newCompany);
            if (errors.length > 0) {
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: errors
                };
            }
            else {
                const savedCompany = yield this.companyRepository.save(newCompany);
                return { company: savedCompany };
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this.companyRepository.find();
            return { items: items, totalCount: items.length };
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const company = yield this.companyRepository
                .createQueryBuilder('company')
                .leftJoinAndSelect('company.enabled', 'enabled')
                .where('company.id=:id', { id: id })
                .getOne();
            if (!company) {
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'There is not company.'
                };
            }
            return { item: company };
        });
    }
    update(id, updateCompanyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const company = yield this.companyRepository.findOne({ id: id });
            if (!company) {
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'There is not company.'
                };
            }
            yield this.companyRepository.update(id, updateCompanyDto);
            const updated = yield this.companyRepository.findOne({ id: id });
            return { company: updated };
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const company = yield this.companyRepository.findOne({ id: id });
            if (!company) {
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'There is not company.'
                };
            }
            return yield this.companyRepository.delete({ id: id });
        });
    }
    enable(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const company = yield this.companyRepository
                .createQueryBuilder('company')
                .leftJoinAndSelect('company.enabled', 'enabled')
                .where('company.id=:id', { id: id })
                .getOne();
            if (!company) {
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'There is not company.'
                };
            }
            company.enabled = [];
            dto.forEach(one => {
                const password = new password_entity_1.PasswordEntity();
                password.id = one.id;
                password.code = one.code;
                password.description = one.description;
                password.name = one.name;
                company.enabled.push(password);
            });
            yield this.companyRepository.save(company);
            const updated = yield this.companyRepository
                .createQueryBuilder('company')
                .leftJoinAndSelect('company.enabled', 'enabled')
                .where('company.id=:id', { id: id })
                .getOne();
            return { enabled: updated.enabled };
        });
    }
};
CompanyService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(company_entity_1.CompanyEntity)),
    __param(1, typeorm_1.InjectRepository(password_entity_1.PasswordEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CompanyService);
exports.CompanyService = CompanyService;
//# sourceMappingURL=company.service.js.map