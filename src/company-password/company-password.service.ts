import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { getRepository, Repository } from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import { PasswordEntity } from '../password/password.entity';
import { CompanyPasswordEntity } from './company-password.entity';
import { CreateCompanyPasswordDto } from './dto/create-company-password.dto';
import { UpdateCompanyPasswordDto } from './dto/update-company-password.dto';

@Injectable()
export class CompanyPasswordService {
  constructor(
    @InjectRepository(CompanyPasswordEntity)
    private readonly companyPasswordRepository: Repository<CompanyPasswordEntity>,
    @InjectRepository(PasswordEntity)
    private readonly passwordRepository: Repository<PasswordEntity>,
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>
  ) {}
  
  async create(createCompanyPasswordDto: CreateCompanyPasswordDto) {
    let newCompanyPassword = new CompanyPasswordEntity();
    newCompanyPassword.pwd = createCompanyPasswordDto.pwd;
    newCompanyPassword.description = createCompanyPasswordDto.description;
    newCompanyPassword.has_threshold = createCompanyPasswordDto.has_threshold;
    newCompanyPassword.threshold = createCompanyPasswordDto.threshold;

    const errors = await validate(newCompanyPassword);
    if (errors.length > 0) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Input is not valid.'
      };
    } else {

      const savedCompanyPassword = await this.companyPasswordRepository.save(newCompanyPassword);
      
      const company = await this.companyRepository.findOne({ where: { id: createCompanyPasswordDto.company }, relations: ['passwords'] });
      company.passwords.push(savedCompanyPassword);
      await this.companyRepository.save(company);

      const password = await this.passwordRepository.findOne({ where: { id: createCompanyPasswordDto.password }, relations: ['passwords'] });
      password.passwords.push(savedCompanyPassword);
      await this.passwordRepository.save(password);
      
      return { item: savedCompanyPassword }
    }
  }

  async findAll(company: number) {
    const qb = await getRepository(CompanyPasswordEntity)
      .createQueryBuilder('company_password')
      .leftJoinAndSelect('company_password.company', 'company')
      .leftJoinAndSelect('company_password.password', 'password')
      .where('company.id = :id', {id: company});

    const passwords = await qb.getMany();
    return { items: passwords, totalCount: passwords.length }
  }

  async findOne(id: number) {
    const qb = await getRepository(CompanyPasswordEntity)
      .createQueryBuilder('company_password')
      .leftJoinAndSelect('company_password.company', 'company')
      .leftJoinAndSelect('company_password.password', 'password');
    const password = await qb.where({ id: id }).getOne();
    if (!password) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not password.'
      };
    }
    return { item : password };
  }

  async update(id: number, updateCompanyPasswordDto: UpdateCompanyPasswordDto) {
    let password = await this.companyPasswordRepository.findOne(id);
    if (!password) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not password.'
      }
    }
    password.pwd = updateCompanyPasswordDto.pwd;
    password.description = updateCompanyPasswordDto.description;
    password.has_threshold = updateCompanyPasswordDto.has_threshold;
    password.threshold = updateCompanyPasswordDto.threshold;

    await this.companyPasswordRepository.update(id, password);
    const updated = await this.companyPasswordRepository.findOne({ id: id });
    return { item : updated };
  }

  async remove(id: number) {
    const password = await this.companyPasswordRepository.findOne({ id: id });
    if (!password) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not password.'
      }
    }
    return await this.companyPasswordRepository.delete({ id: id });
  }

}
