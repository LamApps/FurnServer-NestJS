import { IsNotEmpty } from "class-validator/decorator/decorators";

export class CreateCodeDto {
    readonly company: number;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    content: string;

    page: string;
    active: boolean;

}