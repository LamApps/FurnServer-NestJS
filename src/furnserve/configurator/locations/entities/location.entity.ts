import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
// import { CompanyMenuEntity } from '../company-menu/company-menu.entity';
import { CompanyEntity } from '../../../../company/company.entity';
// import { Permission } from '../enum/permission.enum';
// import { RoleMenuEntity } from '../company-role/role-menu.entity';

@Entity('nest_locations')
export class LocationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  database: string;

  @Column()
  location: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zip: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  website: string;

  @Column()
  open_hours: string;

  @Column()
  timezone: string;

  @Column()
  account: string;

  @Column()
  so_print: string;

  @Column()
  del_print: string;

  @Column()
  logo_url: string;

  @ManyToOne(type=>CompanyEntity, company=>company.id)
  company: CompanyEntity;
}