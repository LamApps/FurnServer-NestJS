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
const class_validator_1 = require("class-validator");
const typeorm_2 = require("typeorm");
const company_entity_1 = require("../company/company.entity");
const password_entity_1 = require("../password/password.entity");
const company_password_entity_1 = require("./company-password.entity");
let CompanyPasswordService = class CompanyPasswordService {
    constructor(companyPasswordRepository, passwordRepository, companyRepository) {
        this.companyPasswordRepository = companyPasswordRepository;
        this.passwordRepository = passwordRepository;
        this.companyRepository = companyRepository;
    }
    async create(createCompanyPasswordDto) {
        let newCompanyPassword = new company_password_entity_1.CompanyPasswordEntity();
        newCompanyPassword.pwd = createCompanyPasswordDto.pwd;
        newCompanyPassword.description = createCompanyPasswordDto.description;
        newCompanyPassword.has_threshold = createCompanyPasswordDto.has_threshold;
        newCompanyPassword.threshold = createCompanyPasswordDto.threshold;
        const errors = await class_validator_1.validate(newCompanyPassword);
        if (errors.length > 0) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Input is not valid.'
            };
        }
        else {
            const savedCompanyPassword = await this.companyPasswordRepository.save(newCompanyPassword);
            const company = await this.companyRepository.findOne({ where: { id: createCompanyPasswordDto.company }, relations: ['passwords'] });
            company.passwords.push(savedCompanyPassword);
            await this.companyRepository.save(company);
            const password = await this.passwordRepository.findOne({ where: { id: createCompanyPasswordDto.password }, relations: ['passwords'] });
            password.passwords.push(savedCompanyPassword);
            await this.passwordRepository.save(password);
            return { item: savedCompanyPassword };
        }
    }
    async findAll(company) {
        const qb = await typeorm_2.getRepository(company_password_entity_1.CompanyPasswordEntity)
            .createQueryBuilder('company_password')
            .leftJoinAndSelect('company_password.company', 'company')
            .leftJoinAndSelect('company_password.password', 'password')
            .where('company.id = :id', { id: company });
        const passwords = await qb.getMany();
        return { items: passwords, totalCount: passwords.length };
    }
    async findOne(id) {
        const qb = await typeorm_2.getRepository(company_password_entity_1.CompanyPasswordEntity)
            .createQueryBuilder('company_password')
            .leftJoinAndSelect('company_password.company', 'company')
            .leftJoinAndSelect('company_password.password', 'password');
        const password = await qb.where({ id: id }).getOne();
        if (!password) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not password.'
            };
        }
        return { item: password };
    }
    async update(id, updateCompanyPasswordDto) {
        let password = await this.companyPasswordRepository.findOne(id);
        if (!password) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not password.'
            };
        }
        password.pwd = updateCompanyPasswordDto.pwd;
        password.description = updateCompanyPasswordDto.description;
        password.has_threshold = updateCompanyPasswordDto.has_threshold;
        password.threshold = updateCompanyPasswordDto.threshold;
        await this.companyPasswordRepository.update(id, password);
        const updated = await this.companyPasswordRepository.findOne({ id: id });
        return { item: updated };
    }
    async remove(id) {
        const password = await this.companyPasswordRepository.findOne({ id: id });
        if (!password) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not password.'
            };
        }
        return await this.companyPasswordRepository.delete({ id: id });
    }
};
CompanyPasswordService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(company_password_entity_1.CompanyPasswordEntity)),
    __param(1, typeorm_1.InjectRepository(password_entity_1.PasswordEntity)),
    __param(2, typeorm_1.InjectRepository(company_entity_1.CompanyEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CompanyPasswordService);
exports.CompanyPasswordService = CompanyPasswordService;
//# sourceMappingURL=company-password.service.js.map