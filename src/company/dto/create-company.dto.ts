import { IsNotEmpty } from "class-validator/decorator/decorators";

export class CreateCompanyDto {
    // @IsNotEmpty()
    readonly app_id: string;

    // @IsNotEmpty()
    readonly number: string;

    // @IsNotEmpty()
    readonly name: string;
  
    // @IsNotEmpty()
    readonly expire_date: Date;

    // @IsNotEmpty()
    readonly first_time_status: boolean;

    // @IsNotEmpty()
    readonly menu_password: string;

    // @IsNotEmpty()
    readonly active: boolean;
	
    // @IsNotEmpty()
    readonly code: string;
	
    readonly timeout: number;
}
