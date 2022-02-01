import { PartialType } from '@nestjs/mapped-types';
import { CreateEmailDto } from './create-email.dto';

export class UpdateEmailDto extends PartialType(CreateEmailDto) {
    email: string;
    description: string;
    store_location: string;
    subject_line: string;
    body: string;
    name_format: string;
    active: boolean;
}
