import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, JoinTable, ManyToMany, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import { IsEmail } from 'class-validator';
import * as argon2 from 'argon2';
import { DeviceEntity } from '../device/device.entity';
import { Role } from '../enum/role.enum';
import { CompanyEntity } from '../company/company.entity';
import { AppsEntity } from '../apps/apps.entity';
import { UserMenuEntity } from '../user-menu/user-menu.entity';
import { CompanyRoleEntity } from '../company-role/company-role.entity';

@Entity('nest_user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: ''})
  token: string;

  @Column({default: ''})
  database: string;

  @Column({default: ''})
  default_database: string;

  @Column({default: ''})
  ip_address: string;

  @Column()
  username: string;

  @Column({default: ''})
  email: string;

  @Column({default: ''})
  photo: string;

  @Column({default: ''})
  firstname: string;
  
  @Column({default: ''})
  lastname: string;

  @Column({default: ''})
  position: string;

  @Column({default: ''})
  mobile: string;

  @Column({default: ''})
  birthday: string;

  @Column()
  password: string;

  @Column({default: ''})
  browser: string;

  @Column({default: ''})
  operating_system: string;

  @Column({default: ''})
  last_login_date: string;

  @Column({default: ''})
  last_login_time: string;

  @Column({default: ''})
  last_login_database: string;

  @Column({ type: Number, default: 0 })
  timeout: number;
  
  @ManyToOne(type => CompanyRoleEntity, role => role.users)
  role: CompanyRoleEntity;

  @Column({ type: 'datetime', default: () => "CURRENT_TIMESTAMP"})
  created: Date;

  @Column()
  active: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password)
    this.created = new Date
  }
  
  @ManyToOne(type => CompanyEntity, company => company.users)
  company: CompanyEntity;
  
  @OneToMany(type => UserMenuEntity, menu=>menu.user)
  @JoinColumn()
  menus: UserMenuEntity[];

  @Column({ default: false })
  deleted: boolean;
}
