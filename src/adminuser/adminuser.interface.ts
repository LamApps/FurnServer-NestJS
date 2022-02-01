import { Role } from "../enum/role.enum";

export interface AdminuserData {
  username: string;
  email: string;
  token: string;
  role: string;
  active: boolean;
}

export interface AdminuserRO {
  user: AdminuserData;
}