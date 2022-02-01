import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { getRepository, Repository } from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import { UserEntity } from '../user/user.entity';
import { CreatePasswordDto } from './dto/create-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PasswordEntity } from './password.entity';

@Injectable()
export class PasswordService {
  constructor(
    @InjectRepository(PasswordEntity)
    private readonly passwordRepository: Repository<PasswordEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
  
  async create(createPasswordDto: CreatePasswordDto) {
    const { code } = createPasswordDto;
    const qb = await getRepository(PasswordEntity)
      .createQueryBuilder('password')
      .where('password.code = :code', { code });

    const company = await qb.getOne();

    if (company) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Code must be unique.'
      }
    }

    let newPassword = new PasswordEntity();
    newPassword.code = createPasswordDto.code;
    newPassword.name = createPasswordDto.name;
    newPassword.description = createPasswordDto.description;
    // newPassword.password = createPasswordDto.password;
    // newPassword.has_threshold = createPasswordDto.has_threshold;
    // newPassword.threshold = createPasswordDto.threshold;

    const errors = await validate(newPassword);
    if (errors.length > 0) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: errors
      }
    } else {
      const savedPassword = await this.passwordRepository.save(newPassword);
      return { item: savedPassword };
    }
  }

  async findAll() {
    const passwords = await this.passwordRepository.find();
    return { items : passwords, totalCount: passwords.length };
  }

  async findOne(id: number) {
    const password = await this.passwordRepository.findOne({id: id});
    if (!password) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not password.'
      };
    }
    return { item : password };
  }

  async update(id: number, updatePasswordDto: UpdatePasswordDto) {
    const password = await this.passwordRepository.findOne({ id: id });
    if (!password) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not password.'
      }
    }
    await this.passwordRepository.update(id, updatePasswordDto);
    const updated = await this.passwordRepository.findOne({ id: id });
    return { item : updated };
  }

  async remove(id: number) {
    const password = await this.passwordRepository.findOne({ id: id });
    if (!password) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not password.'
      }
    }
    return await this.passwordRepository.delete({ id: id });
  }
}
