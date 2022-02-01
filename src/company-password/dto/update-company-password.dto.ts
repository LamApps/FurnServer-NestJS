import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyPasswordDto } from './create-company-password.dto';

export class UpdateCompanyPasswordDto extends PartialType(CreateCompanyPasswordDto) {}
