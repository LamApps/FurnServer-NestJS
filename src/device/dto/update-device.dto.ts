import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator/decorator/decorators';
import { CreateDeviceDto } from './create-device.dto';

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {
    @IsNotEmpty()
    readonly id: number;
}
