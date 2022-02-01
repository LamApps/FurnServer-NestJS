import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { RoleMenuEntity } from "../company-role/role-menu.entity";
import { CompanyEntity } from "../company/company.entity";
import { Permission } from "../enum/permission.enum";
import { MenuEntity } from "../menu/menu.entity";

@Entity('nest_company_menu_1')
export class CompanyMenuEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({
    type: 'enum',
    enum: Permission,
    default: Permission.None,
  })
  permission: Permission;

  @ManyToOne(type=>MenuEntity, menu=>menu.id)
  menu: MenuEntity;

  @ManyToOne(type=>CompanyEntity, company=>company.id)
  company: CompanyEntity;

  @OneToMany(type=>RoleMenuEntity, role=>role.menu)
  @JoinColumn()
  roles: RoleMenuEntity[];
}