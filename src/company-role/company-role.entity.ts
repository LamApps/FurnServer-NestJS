import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { CompanyMenuEntity } from "../company-menu/company-menu.entity";
import { CompanyEntity } from "../company/company.entity";
import { UserMenuEntity } from "../user-menu/user-menu.entity";
import { UserEntity } from "../user/user.entity";
import { RoleMenuEntity } from "./role-menu.entity";

@Entity('nest_company_role')
export class CompanyRoleEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @ManyToOne(type=>CompanyEntity, company=>company.id)
  company: CompanyEntity;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: true })
  active: boolean;

  @OneToMany(type => RoleMenuEntity, menu=>menu.role)
  @JoinColumn()
  menus: RoleMenuEntity[];

  @OneToMany(type => UserEntity, user=>user.role)
  @JoinColumn()
  users: UserEntity[];
}