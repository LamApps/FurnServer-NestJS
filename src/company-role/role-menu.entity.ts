import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { MenuEntity } from "../menu/menu.entity";
import { Permission } from "../enum/permission.enum";
import { CompanyRoleEntity } from "./company-role.entity";

@Entity('nest_role_menu')
export class RoleMenuEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @ManyToOne(type=>CompanyRoleEntity, role=>role.menus)
  role: CompanyRoleEntity;

  @ManyToOne(type=>MenuEntity, menu=>menu.role_menus)
  menu: MenuEntity;

  @Column({
    type: 'enum',
    enum: Permission,
    default: Permission.None,
  })
  permission: Permission;
}