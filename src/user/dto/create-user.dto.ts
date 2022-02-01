import { IsNotEmpty } from 'class-validator';
import { Role } from '../../enum/role.enum';

export class CreateUserDto {

  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly company: number;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly active: boolean;

  email: string;
  firstname: string;
  lastname: string;
  position: string;
  mobile: string;
  role: number;
  birthday: string;
  database: string;
  default_database: string;
  timeout: number;
}