import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository, getRepository } from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import { CodeEntity } from './entities/code.entity';

@Injectable()
export class CodeService {
  constructor(
    @InjectRepository(CodeEntity)
    private readonly codeRepository: Repository<CodeEntity>,
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>
  ) {}

  async create(createCodeDto: CreateCodeDto) {
    let code = new CodeEntity();
    code.description = createCodeDto.description;
    code.content = createCodeDto.content;
    code.page = createCodeDto.page;
    code.active = createCodeDto.active;
    if(createCodeDto.company>0) code.company = createCodeDto.company;

    const errors = await validate(code);
    if (errors.length > 0) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Input is not valid.'
      };
    } else {

      const savedCode = await this.codeRepository.save(code);
      
      // const company = await this.companyRepository.findOne({ where: { id: createEmailDto.company }, relations: ['emails'] });
      // company.emails.push(savedCode);
      // await this.companyRepository.save(company);
      
      return { status: HttpStatus.OK, item: savedCode }
    }
  }

  async findAll(company: number) {
    let qb = getRepository(CodeEntity)
    .createQueryBuilder('code')
    .leftJoinAndSelect('code.company', 'company');
    if(company>0){
      qb = qb.where('company.id = :id', {id: company});
    }

    const codes = await qb.getMany();
    return { items: codes, totalCount: codes.length }
  }

  async findOne(id: number) {
    const code = await this.codeRepository.findOne({id: id});
    if (!code) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not Role.'
      };
    }
    return { item : code };
  }

  async update(id: number, updateCodeDto: UpdateCodeDto) {
    const code = await this.codeRepository.findOne({ id: id });
    if (!code) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not Role.'
      }
    }
    code.description = updateCodeDto.description;
    code.content = updateCodeDto.content;
    code.page = updateCodeDto.page;
    code.active = updateCodeDto.active;
    
    const updated = await this.codeRepository.save(code);
    return { item : updated };
  }

  async remove(id: number) {
    const role = await this.codeRepository.findOne({ id: id });
    if (!role) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not Role.'
      }
    }
    return await this.codeRepository.delete({ id: id });
  }
}
