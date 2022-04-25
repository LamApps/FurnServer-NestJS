import { PartialType } from '@nestjs/swagger';
import { CreateUserMenuDto } from './create-user-menu.dto';

export class UpdateUserMenuDto extends PartialType(CreateUserMenuDto) {}
