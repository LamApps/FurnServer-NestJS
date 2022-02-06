import { IsNotEmpty } from "class-validator";

export class CreateUuidDto {
    @IsNotEmpty()
    readonly unique_id: string;

    @IsNotEmpty()
    readonly uuid: string;
  
    readonly description: string;

    readonly version: string;

    @IsNotEmpty()
    readonly last_date_verified: string;

    @IsNotEmpty()
    readonly company: number;
    
    @IsNotEmpty()
    readonly active: boolean;
}
