import { CompanyRoleEntity } from "../company-role/company-role.entity";
import { CompanyEntity } from "../company/company.entity";
import { Role } from "../enum/role.enum";

export interface UserData {
  username: string;
  email: string;
  token: string;
  company: CompanyEntity;
  role: CompanyRoleEntity;
  active: boolean;
}

export interface UserRO {
  user: UserData;
}