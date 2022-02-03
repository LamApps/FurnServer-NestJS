import { IsNotEmpty } from "class-validator/decorator/decorators";

export class CreateCodeDto {
    readonly company: number;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    code: string;

    page: string;
    active: boolean;

}