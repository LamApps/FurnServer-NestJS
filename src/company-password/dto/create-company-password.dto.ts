import { IsNotEmpty } from "class-validator";

export class CreateCompanyPasswordDto {
    @IsNotEmpty()
    readonly pwd: string;
  
    readonly description: string;

    @IsNotEmpty()
    readonly has_threshold: boolean;

    readonly threshold: number;

    @IsNotEmpty()
    readonly password: number;

    @IsNotEmpty()
    readonly company: number;
}
