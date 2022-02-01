import { IsNotEmpty } from "class-validator/decorator/decorators";

export class CreateMenuDto {
    @IsNotEmpty()
    readonly link: string;
    readonly description: string;
}