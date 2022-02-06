import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { CompanyPasswordEntity } from '../company-password/company-password.entity';
import { CompanyEntity } from '../company/company.entity';
import { QrcodeEntity } from '../qrcode/qrcode.entity';
import { UUIDEntity } from '../uuid/uuid.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ApiService {
    constructor(
        private mailerService: MailerService,
    ) {}

    async getPasswords(app_id: string) {
        const qb = await getRepository(CompanyPasswordEntity)
            .createQueryBuilder('company_password')
            .leftJoinAndSelect('company_password.company', 'company')
            .leftJoinAndSelect('company_password.password', 'password')
            .where('company.app_id = :app_id', { app_id: app_id });

        const items = await qb.getMany();
        const passwords = [];
        items.forEach(password => {
            passwords.push({
                ...password,
                code: password.password.code,
                password: password.pwd, 
                company: null,
                pwd: null
            })
        })

        const company = await getRepository(CompanyEntity)
            .createQueryBuilder('company')
            .leftJoinAndSelect('company.enabled', 'enabled')
            .where('company.app_id=:app_id', { app_id: app_id })
            .getOne();
        const enabled = [];
        company.enabled.forEach(item => {
            enabled.push(item.code);
        })
        passwords.push({
            id: 1000,
            code: "OPB",
            password: company.menu_password,
            description : "OPTION BUTTON",
            has_threshold: false,
            threshold: 0
        })
        enabled.push('OPB');

        const result = { 
            "status": true,
            "result": {
                "password": passwords,
                "enabled" : enabled
            }
        }
        return result;
    }

    async checkLicense(body: any) {
        const { app_id, uuid, version } = body;
        const company = await getRepository(CompanyEntity)
            .createQueryBuilder('company')
            .leftJoinAndSelect('company.enabled', 'enabled')
            .where('company.app_id=:app_id', { app_id: app_id })
            .getOne();
        if (!company) {
            return { 
                status: false,
                error: "Invalid App ID"
            }
        }
        if (!company.active) {
            return { 
                status: false,
                error: "Company is not activated"
            }
        }
        const now = new Date();
        if (company.expire_date < now) {
            return { 
                status: false,
                error: "License is expired"
            }
        }
        const _uuid = await getRepository(UUIDEntity)
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
                }
            }

            _uuid.last_date_verified = new Date().toLocaleDateString();
            _uuid.version = version;
        
            await getRepository(UUIDEntity).update(_uuid.id, _uuid);
            const updated = await getRepository(UUIDEntity).findOne(_uuid.id);
            return { 
                status: true,
                unique_id: updated.unique_id
            }
        } else {
            const uuids = await getRepository(UUIDEntity)
                .createQueryBuilder('uuid')
                .leftJoinAndSelect('uuid.company', 'company')
                .where('company.id = :id', {id: company.id}).getMany();
            
            for (let unique_id = 1; unique_id < 1000; unique_id++) {
                let exist: boolean = false;
                uuids.forEach(item => {
                    if (item.unique_id == ('000' + unique_id).substr(-3)) {
                        exist = true;
                    }
                });
                if (!exist) {
                    let _uuid = new UUIDEntity();
                    _uuid.uuid = uuid;
                    _uuid.last_date_verified = new Date().toLocaleDateString();
                    _uuid.version = version;
                    _uuid.active = company.first_time_status;
                    _uuid.unique_id = ('000' + unique_id).substr(-3);

                    const saved = await getRepository(UUIDEntity).save(_uuid);
      
                    const _company = await getRepository(CompanyEntity).findOne({ where: { id: company.id }, relations: ['uuids'] });
                    _company.uuids.push(saved);
                    await getRepository(CompanyEntity).save(_company);

                    if (saved.active) {
                        return { 
                            status: true,
                            unique_id: saved.unique_id
                        }    
                    } else {
                        return { 
                            status: false,
                            error: "Device is inactive"
                        }
                    }
                }
            }
            return uuids;
        }
        
    }

    async addQRCode(code: string) {
        let qrcode = new QrcodeEntity();
        qrcode.code = code;

        const saved = await getRepository(QrcodeEntity).save(qrcode);
        return { status: true, id: saved.id }
    }

    async getQRCode(id: number) {
        const qrcode = await getRepository(QrcodeEntity).findOne(id);
        if (!qrcode) {
            return { status: false }
        } else {
            return { status: true, code: qrcode.code }
        }
    }

    async sendEmail(params: any, pdf: any) {
        const { app_id, store, firstname, lastname, timestamp, email } = params;

        const company = await getRepository(CompanyEntity)
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
                            // from: email_entity.email,
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
}
