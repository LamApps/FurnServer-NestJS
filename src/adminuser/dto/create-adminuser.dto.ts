import { IsNotEmpty } from 'class-validator';

export class CreateAdminuserDto {

  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly active: boolean;
  
  
  readonly roles: number;

  firstname: string;
  lastname: string;
  position: string;
  role: string;
  birthday: string;
  mobile: string;
}