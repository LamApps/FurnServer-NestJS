import { IsNotEmpty } from "class-validator/decorator/decorators";

export class CreateAppsDto {

    @IsNotEmpty()
    readonly type: string;
	
    @IsNotEmpty()
    readonly app_id: string;
  
    @IsNotEmpty()
    readonly expire_date: Date;

    @IsNotEmpty()
    readonly first_time_status: boolean;

    @IsNotEmpty()
    readonly menu_password: string;

    @IsNotEmpty()
    readonly companies: string;	

    @IsNotEmpty()
    readonly active: boolean;
  }