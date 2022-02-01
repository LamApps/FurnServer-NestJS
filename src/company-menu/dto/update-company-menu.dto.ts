import { PartialType } from '@nestjs/swagger';
import { CreateCompanyMenuDto } from './create-company-menu.dto';

export class UpdateCompanyMenuDto extends PartialType(CreateCompanyMenuDto) {}
