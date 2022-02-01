import { IsNotEmpty } from "class-validator";

export class CreatePasswordDto {
    @IsNotEmpty()
    readonly code: string;
  
    @IsNotEmpty()
    readonly name: string;

    // @IsNotEmpty()
    readonly description: string;

    // @IsNotEmpty()
    // readonly password: string;

    // @IsNotEmpty()
    // readonly has_threshold: boolean;

    // @IsNotEmpty()
    // readonly threshold: number;
}
