import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { CompanyMenuEntity } from "../company-menu/company-menu.entity";
import { Permission } from "../enum/permission.enum";
import { CompanyRoleEntity } from "./company-role.entity";

@Entity('nest_role_menu')
export class RoleMenuEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @ManyToOne(type=>CompanyRoleEntity, role=>role.menus)
  role: CompanyRoleEntity;

  @ManyToOne(type=>CompanyMenuEntity, menu=>menu.roles)
  menu: CompanyMenuEntity;

  @Column({
    type: 'enum',
    enum: Permission,
    default: Permission.None,
  })
  permission: Permission;
}