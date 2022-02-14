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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_validator_1 = require("class-validator");
const typeorm_2 = require("typeorm");
const company_menu_entity_1 = require("../company-menu/company-menu.entity");
const menu_entity_1 = require("../menu/menu.entity");
const password_entity_1 = require("../password/password.entity");
const company_entity_1 = require("./company.entity");
let CompanyService = class CompanyService {
    constructor(companyRepository) {
        this.companyRepository = companyRepository;
    }
    async create(createCompanyDto) {
        const { name, app_id, number, code } = createCompanyDto;
        let qb = await typeorm_2.getRepository(company_entity_1.CompanyEntity)
            .createQueryBuilder('company')
            .where('company.name = :name', { name })
            .orWhere('company.app_id = :app_id', { app_id });
        let company = await qb.getOne();
        if (company) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Name must be unique.'
            };
        }
        qb = await typeorm_2.getRepository(company_entity_1.CompanyEntity)
            .createQueryBuilder('company')
            .where('company.number = :number', { number });
        company = await qb.getOne();
        if (company) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Company # must be unique.'
            };
        }
        let newCompany = new company_entity_1.CompanyEntity();
        newCompany.number = number;
        newCompany.app_id = app_id;
        newCompany.name = name;
        newCompany.expire_date = createCompanyDto.expire_date;
        newCompany.first_time_status = createCompanyDto.first_time_status;
        newCompany.menu_password = createCompanyDto.menu_password;
        newCompany.active = createCompanyDto.active;
        newCompany.code = code;
        newCompany.timeout = createCompanyDto.timeout;
        const errors = await class_validator_1.validate(newCompany);
        if (errors.length > 0) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: errors
            };
        }
        else {
            const savedCompany = await this.companyRepository.save(newCompany);
            return { company: savedCompany };
        }
    }
    async findAll() {
        const items = await this.companyRepository
            .createQueryBuilder('company')
            .leftJoinAndSelect('company.menus', 'menus')
            .leftJoinAndSelect('menus.menu', 'menu')
            .getMany();
        return { items: items, totalCount: items.length };
    }
    async findOne(id) {
        const company = await this.companyRepository
            .createQueryBuilder('company')
            .leftJoinAndSelect('company.enabled', 'enabled')
            .leftJoinAndSelect('company.menus', 'menus')
            .leftJoinAndSelect('menus.menu', 'menu')
            .where('company.id=:id', { id: id })
            .getOne();
        if (!company) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not company.'
            };
        }
        return { item: company };
    }
    async update(id, updateCompanyDto) {
        const company = await this.companyRepository.findOne({ id: id });
        if (!company) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not company.'
            };
        }
        await this.companyRepository.update(id, updateCompanyDto);
        const updated = await this.companyRepository.findOne({ id: id });
        return { company: updated };
    }
    async remove(id) {
        const company = await this.companyRepository.findOne({ id: id });
        if (!company) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not company.'
            };
        }
        return await this.companyRepository.delete({ id: id });
    }
    async updatePermission(id, dto) {
        var company = await this.companyRepository
            .createQueryBuilder('company')
            .leftJoinAndSelect('company.menus', 'menus')
            .where('company.id=:id', { id: id })
            .getOne();
        if (!company) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not company.'
            };
        }
        for (let i = 0; i < dto.length; i++) {
            const one = dto[i];
            const permission = one.permission;
            const menu_entity = await typeorm_2.getRepository(menu_entity_1.MenuEntity)
                .createQueryBuilder('menu')
                .leftJoinAndSelect('menu.company_menus', 'company_menus')
                .where('menu.id=:id', { id: one.id })
                .getOne();
            if (!menu_entity)
                return;
            var company_menu_entity = await typeorm_2.getRepository(company_menu_entity_1.CompanyMenuEntity)
                .createQueryBuilder('company_menu')
                .leftJoinAndSelect('company_menu.company', 'company')
                .leftJoinAndSelect('company_menu.menu', 'menu')
                .where('company.id=:id', { id: id })
                .andWhere('menu.id=:mid', { mid: one.id })
                .getOne();
            if (company_menu_entity) {
                company_menu_entity.permission = permission;
                await typeorm_2.getRepository(company_menu_entity_1.CompanyMenuEntity).save(company_menu_entity);
            }
            else {
                company_menu_entity = new company_menu_entity_1.CompanyMenuEntity();
                company_menu_entity.permission = permission;
                const saved = await typeorm_2.getRepository(company_menu_entity_1.CompanyMenuEntity).save(company_menu_entity);
                menu_entity.company_menus.push(saved);
                await typeorm_2.getRepository(menu_entity_1.MenuEntity).save(menu_entity);
                company.menus.push(saved);
                company = await typeorm_2.getRepository(company_entity_1.CompanyEntity).save(company);
            }
        }
        const updated = await this.findOne(id);
        return { company: updated };
    }
    async enable(id, dto) {
        const company = await this.companyRepository
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
        await this.companyRepository.save(company);
        const updated = await this.companyRepository
            .createQueryBuilder('company')
            .leftJoinAndSelect('company.enabled', 'enabled')
            .where('company.id=:id', { id: id })
            .getOne();
        return { enabled: updated.enabled };
    }
};
CompanyService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(company_entity_1.CompanyEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CompanyService);
exports.CompanyService = CompanyService;
//# sourceMappingURL=company.service.js.map