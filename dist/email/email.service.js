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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_validator_1 = require("class-validator");
const typeorm_2 = require("typeorm");
const company_entity_1 = require("../company/company.entity");
const email_entity_1 = require("./email.entity");
let EmailService = class EmailService {
    constructor(emailRepository, companyRepository) {
        this.emailRepository = emailRepository;
        this.companyRepository = companyRepository;
    }
    async create(createEmailDto) {
        let email = new email_entity_1.EmailEntity();
        email.email = createEmailDto.email;
        email.description = createEmailDto.description;
        email.store_location = createEmailDto.store_location;
        email.subject_line = createEmailDto.subject_line;
        email.body = createEmailDto.body;
        email.name_format = createEmailDto.name_format;
        email.active = createEmailDto.active;
        const errors = await class_validator_1.validate(email);
        if (errors.length > 0) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Input is not valid.'
            };
        }
        else {
            const savedEmail = await this.emailRepository.save(email);
            const company = await this.companyRepository.findOne({ where: { id: createEmailDto.company }, relations: ['emails'] });
            company.emails.push(savedEmail);
            await this.companyRepository.save(company);
            return { status: common_1.HttpStatus.OK, item: savedEmail };
        }
    }
    async findAll(company) {
        const qb = await typeorm_2.getRepository(email_entity_1.EmailEntity)
            .createQueryBuilder('email')
            .leftJoinAndSelect('email.company', 'company')
            .where('company.id = :id', { id: company });
        const emails = await qb.getMany();
        return { items: emails, totalCount: emails.length };
    }
    async findOne(id) {
        const email = await this.emailRepository.findOne({ id: id });
        if (!email) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not email.'
            };
        }
        return { item: email };
    }
    async update(id, updateEmailDto) {
        let email = await this.emailRepository.findOne(id);
        if (!email) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not email.'
            };
        }
        const { description, store_location, name_format, subject_line, body, active } = updateEmailDto;
        email.email = updateEmailDto.email;
        email.description = description;
        email.store_location = store_location;
        email.subject_line = subject_line;
        email.name_format = name_format;
        email.body = body;
        email.active = active;
        await this.emailRepository.update(id, email);
        const updated = await this.emailRepository.findOne({ id: id });
        return { item: updated };
    }
    async remove(id) {
        const email = await this.emailRepository.findOne({ id: id });
        if (!email) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not email.'
            };
        }
        return await this.emailRepository.delete({ id: id });
    }
};
EmailService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(email_entity_1.EmailEntity)),
    __param(1, typeorm_1.InjectRepository(company_entity_1.CompanyEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map