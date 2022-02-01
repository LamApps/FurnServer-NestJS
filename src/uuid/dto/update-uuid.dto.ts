import { PartialType } from '@nestjs/mapped-types';
import { CreateUuidDto } from './create-uuid.dto';

export class UpdateUuidDto extends PartialType(CreateUuidDto) {}
