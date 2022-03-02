import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { CompanyMenuEntity } from '../company-menu/company-menu.entity';
import { CompanyEntity } from '../company/company.entity';
import { Permission } from '../enum/permission.enum';
import { RoleMenuEntity } from '../company-role/role-menu.entity';

@Entity('nest_menu')
export class MenuEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  link: string;

  @Column()
  description: string;

  @OneToMany(type=>CompanyMenuEntity, menu=>menu.menu)
  company_menus: CompanyMenuEntity[];

  @OneToMany(type=>RoleMenuEntity, menu=>menu.menu)
  role_menus: RoleMenuEntity[];

}