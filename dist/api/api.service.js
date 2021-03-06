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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const company_password_entity_1 = require("../company-password/company-password.entity");
const company_entity_1 = require("../company/company.entity");
const qrcode_entity_1 = require("../qrcode/qrcode.entity");
const uuid_entity_1 = require("../uuid/uuid.entity");
const mailer_1 = require("@nestjs-modules/mailer");
let ApiService = class ApiService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async getPasswords(app_id) {
        const qb = await typeorm_1.getRepository(company_password_entity_1.CompanyPasswordEntity)
            .createQueryBuilder('company_password')
            .leftJoinAndSelect('company_password.company', 'company')
            .leftJoinAndSelect('company_password.password', 'password')
            .where('company.app_id = :app_id', { app_id: app_id });
        const items = await qb.getMany();
        const passwords = [];
        items.forEach(password => {
            passwords.push(Object.assign(Object.assign({}, password), { code: password.password.code, password: password.pwd, company: null, pwd: null }));
        });
        const company = await typeorm_1.getRepository(company_entity_1.CompanyEntity)
            .createQueryBuilder('company')
            .leftJoinAndSelect('company.enabled', 'enabled')
            .where('company.app_id=:app_id', { app_id: app_id })
            .getOne();
        const enabled = [];
        company.enabled.forEach(item => {
            enabled.push(item.code);
        });
        passwords.push({
            id: 1000,
            code: "OPB",
            password: company.menu_password,
            description: "OPTION BUTTON",
            has_threshold: false,
            threshold: 0
        });
        enabled.push('OPB');
        const result = {
            "status": true,
            "result": {
                "password": passwords,
                "enabled": enabled
            }
        };
        return result;
    }
    async checkLicense(body) {
        const { app_id, uuid, version } = body;
        const company = await typeorm_1.getRepository(company_entity_1.CompanyEntity)
            .createQueryBuilder('company')
            .leftJoinAndSelect('company.enabled', 'enabled')
            .where('company.app_id=:app_id', { app_id: app_id })
            .getOne();
        if (!company) {
            return {
                status: false,
                error: "Invalid App ID"
            };
        }
        if (!company.active) {
            return {
                status: false,
                error: "Company is not activated"
            };
        }
        const now = new Date();
        if (company.expire_date < now) {
            return {
                status: false,
                error: "License is expired"
            };
        }
        const _uuid = await typeorm_1.getRepository(uuid_entity_1.UUIDEntity)
            .createQueryBuilder('uuid')
            .leftJoinAndSelect('uuid.company', 'company')
            .where('company.app_id=:app_id', { app_id: app_id })
            .andWhere('uuid=:uuid', { uuid: uuid })
            .getOne();
        if (_uuid) {
            if (!_uuid.active) {
                return {
                    status: false,
                    error: "Device is inactive"
                };
            }
            _uuid.last_date_verified = new Date().toLocaleDateString();
            _uuid.version = version;
            await typeorm_1.getRepository(uuid_entity_1.UUIDEntity).update(_uuid.id, _uuid);
            const updated = await typeorm_1.getRepository(uuid_entity_1.UUIDEntity).findOne(_uuid.id);
            return {
                status: true,
                unique_id: updated.unique_id
            };
        }
        else {
            const uuids = await typeorm_1.getRepository(uuid_entity_1.UUIDEntity)
                .createQueryBuilder('uuid')
                .leftJoinAndSelect('uuid.company', 'company')
                .where('company.id = :id', { id: company.id }).getMany();
            for (let unique_id = 1; unique_id < 1000; unique_id++) {
                let exist = false;
                uuids.forEach(item => {
                    if (item.unique_id == ('000' + unique_id).substr(-3)) {
                        exist = true;
                    }
                });
                if (!exist) {
                    let _uuid = new uuid_entity_1.UUIDEntity();
                    _uuid.uuid = uuid;
                    _uuid.last_date_verified = new Date().toLocaleDateString();
                    _uuid.version = version;
                    _uuid.active = company.first_time_status;
                    _uuid.unique_id = ('000' + unique_id).substr(-3);
                    const saved = await typeorm_1.getRepository(uuid_entity_1.UUIDEntity).save(_uuid);
                    const _company = await typeorm_1.getRepository(company_entity_1.CompanyEntity).findOne({ where: { id: company.id }, relations: ['uuids'] });
                    _company.uuids.push(saved);
                    await typeorm_1.getRepository(company_entity_1.CompanyEntity).save(_company);
                    if (saved.active) {
                        return {
                            status: true,
                            unique_id: saved.unique_id
                        };
                    }
                    else {
                        return {
                            status: false,
                            error: "Device is inactive"
                        };
                    }
                }
            }
            return uuids;
        }
    }
    async addQRCode(code) {
        let qrcode = new qrcode_entity_1.QrcodeEntity();
        qrcode.code = code;
        const saved = await typeorm_1.getRepository(qrcode_entity_1.QrcodeEntity).save(qrcode);
        return { status: true, id: saved.id };
    }
    async getQRCode(id) {
        const qrcode = await typeorm_1.getRepository(qrcode_entity_1.QrcodeEntity).findOne(id);
        if (!qrcode) {
            return { status: false };
        }
        else {
            return { status: true, code: qrcode.code };
        }
    }
    async sendEmail(params, pdf) {
        const { app_id, store, firstname, lastname, timestamp, email } = params;
        const company = await typeorm_1.getRepository(company_entity_1.CompanyEntity)
            .createQueryBuilder('company')
            .leftJoinAndSelect('company.emails', 'emails')
            .where('company.app_id=:app_id', { app_id: app_id })
            .getOne();
        if (!company) {
            return { status: false, message: 'Can not send email' };
        }
        for (const email_entity of company.emails) {
            const store_location = email_entity.store_location;
            const stores = store_location.split(',');
            for (const one of stores) {
                if (one == store) {
                    const subject_line = email_entity.subject_line;
                    let name_format = email_entity.name_format.replace('\"Billing_First_Name\"', firstname);
                    name_format = name_format.replace('\"Billing_Last_Name\"', lastname);
                    name_format = name_format.replace('\"Timestamp\"', timestamp);
                    let body = email_entity.body.replace('\"Billing_First_Name\"', firstname);
                    body = body.replace('\"Billing_Last_Name\"', lastname);
                    body = body.replace('\"Company_Name\"', company.name);
                    return await this.mailerService
                        .sendMail({
                        to: email,
                        from: `${email_entity.email}<invoice@furnserve.email>`,
                        subject: subject_line,
                        text: body,
                        attachments: [
                            {
                                filename: name_format,
                                path: pdf.path
                            },
                        ]
                    })
                        .then((success) => {
                        return { status: true };
                    })
                        .catch((error) => {
                        return { status: false, message: error.message };
                    });
                }
            }
        }
        return { status: false, message: 'Can not send email' };
    }
};
ApiService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], ApiService);
exports.ApiService = ApiService;
//# sourceMappingURL=api.service.js.map