import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { userInfo } from 'os';
import { Repository, getRepository } from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import { EmailEntity } from './email.entity';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(EmailEntity)
    private readonly emailRepository: Repository<EmailEntity>,
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>
  ) {}

  async create(createEmailDto: CreateEmailDto) {
    let email = new EmailEntity();
    email.email = createEmailDto.email;
    email.description = createEmailDto.description;
    email.store_location = createEmailDto.store_location;
    email.subject_line = createEmailDto.subject_line;
    email.body = createEmailDto.body;
    email.name_format = createEmailDto.name_format;
    email.active = createEmailDto.active;

    const errors = await validate(email);
    if (errors.length > 0) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Input is not valid.'
      };
    } else {

      const savedEmail = await this.emailRepository.save(email);
      
      const company = await this.companyRepository.findOne({ where: { id: createEmailDto.company }, relations: ['emails'] });
      company.emails.push(savedEmail);
      await this.companyRepository.save(company);
      
      return { status: HttpStatus.OK, item: savedEmail }
    }
  }

  async findAll(company: number) {
    const qb = await getRepository(EmailEntity)
    .createQueryBuilder('email')
    .leftJoinAndSelect('email.company', 'company')
    .where('company.id = :id', {id: company});

    const emails = await qb.getMany();
    return { items: emails, totalCount: emails.length }
  }

  async findOne(id: number) {
    const email = await this.emailRepository.findOne({id: id});
    if (!email) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not email.'
      };
    }
    return { item : email };
  }

  async update(id: number, updateEmailDto: UpdateEmailDto) {
    let email = await this.emailRepository.findOne(id);
    if (!email) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not email.'
      }
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
    return { item : updated };
  }

  async remove(id: number) {
    const email = await this.emailRepository.findOne({ id: id });
    if (!email) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not email.'
      }
    }
    return await this.emailRepository.delete({ id: id });
  }
}
