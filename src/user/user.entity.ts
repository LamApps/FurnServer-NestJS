import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, JoinTable, ManyToMany, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import { IsEmail } from 'class-validator';
import * as argon2 from 'argon2';
import { DeviceEntity } from '../device/device.entity';
import { Role } from '../enum/role.enum';
import { CompanyEntity } from '../company/company.entity';
import { AppsEntity } from '../apps/apps.entity';
import { CompanyRoleEntity } from '../company-role/company-role.entity';
import { RoomsEntity } from '../chat/rooms/entities/room.entity';
import { ChatLogEntity } from '../chat/private/entities/chat-log.entity';
import { RoomLogEntity } from '../chat/rooms/entities/room-log.entity';
import { ChatContactEntity } from '../chat/private/entities/chat-contact.entity';
import { RoomBannedUsersEntity } from '../chat/rooms/entities/room_banned_users';

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

  @Column({default: true})
  chat_alert: boolean;
  
  @Column({default: true})
  sound: boolean;

  @Column({default: 5})
  alert_fadetime: number;

  @Column({default: 'success'})
  default_status: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password)
    this.created = new Date
  }
  
  @ManyToOne(type => CompanyEntity, company => company.users)
  company: CompanyEntity;

  @OneToMany(type => RoomsEntity, room=>room.user)
  @JoinColumn()
  rooms: RoomsEntity[];

  @OneToMany(type => ChatLogEntity, chat_log=>chat_log.sender)
  @JoinColumn()
  chat_logs: ChatLogEntity[];

  @OneToMany(type => ChatLogEntity, chat_log=>chat_log.recipient)
  @JoinColumn()
  chat_logs_rec: ChatLogEntity[];


  @OneToMany(type => RoomLogEntity, room_log=>room_log.sender)
  @JoinColumn()
  room_logs: RoomLogEntity[];

  @OneToMany(type => ChatContactEntity, chat_contact=>chat_contact.owner)
  @JoinColumn()
  chat_contacts: ChatContactEntity[];

  @OneToMany(type => ChatContactEntity, chat_contact=>chat_contact.user)
  @JoinColumn()
  contact_users: ChatContactEntity[];

  @OneToMany(type => RoomBannedUsersEntity, room_banned=>room_banned.user)
  @JoinColumn()
  banned_users: RoomBannedUsersEntity[];

  @Column({ default: false })
  deleted: boolean;
}
