import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator/decorator/decorators';
import { CreateAppsDto } from './create-apps.dto';

export class UpdateAppsDto extends PartialType(CreateAppsDto) {
    @IsNotEmpty()
    readonly id: number;
}
