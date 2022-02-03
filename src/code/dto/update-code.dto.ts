import { CreateCodeDto } from './create-code.dto';
import { IsNotEmpty } from "class-validator";

export class UpdateCodeDto {
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    code: string;

    page: string;
    active: boolean;
}
