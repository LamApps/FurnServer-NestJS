import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { CompanyPasswordEntity } from '../company-password/company-password.entity';
import { EmailEntity } from '../email/email.entity';
import { PasswordEntity } from '../password/password.entity';
import { UserEntity } from '../user/user.entity';
import { AppsEntity } from '../apps/apps.entity';
import { UUIDEntity } from '../uuid/uuid.entity';
import { CompanyMenuEntity } from '../company-menu/company-menu.entity';
import { CompanyRoleEntity } from '../company-role/company-role.entity';
import { CodeEntity } from '../code/entities/code.entity';
import { RoomsEntity } from '../chat/rooms/entities/room.entity';
export class Company {}

@Entity('nest_company')
export class CompanyEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  number: string;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  app_id: string;

  @Column({ default: '' })
  code: string;

  @Column({ type: Number, default: 0 })
  timeout: number;
  
  @Column({ type: 'datetime', default: () => "CURRENT_TIMESTAMP"})
  expire_date: Date;

  @Column({ default: true })
  first_time_status: boolean;

  @Column({ default: '' })
  menu_password: string;

  @Column()
  active: boolean;

  @OneToMany(type => CompanyMenuEntity, menu=>menu.company)
  @JoinColumn()
  menus: CompanyMenuEntity[];

  @OneToMany(type => CompanyRoleEntity, role=>role.company)
  @JoinColumn()
  roles: CompanyRoleEntity[];

  @OneToMany(type => UserEntity, user=>user.company)
  @JoinColumn()
  users: UserEntity[];
  
  @OneToMany(type => UUIDEntity, uuid=>uuid.company)
  @JoinColumn()
  uuids: UUIDEntity[];

  @OneToMany(type => EmailEntity, email=>email.company)
  @JoinColumn()
  emails: EmailEntity[];

  @OneToMany(type => CompanyPasswordEntity, password=>password.company)
  @JoinColumn()
  passwords: CompanyPasswordEntity[];

  @ManyToMany(type=>PasswordEntity, password=>password.id)
  @JoinTable()
  enabled: PasswordEntity[];
  
  @OneToMany(type => AppsEntity, apps => apps.companies)
  @JoinColumn()
  apps: AppsEntity[];

  @OneToMany(type => CodeEntity, code => code.company)
  @JoinColumn()
  codes: CodeEntity[];

  @OneToMany(type => RoomsEntity, rooms => rooms.company)
  @JoinColumn()
  rooms: RoomsEntity[];

}