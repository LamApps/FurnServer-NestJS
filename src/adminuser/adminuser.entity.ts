import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, JoinTable, ManyToMany, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import { IsEmail } from 'class-validator';
import * as argon2 from 'argon2';
import { DeviceEntity } from '../device/device.entity';
import { Role } from '../enum/role.enum';
import { RolesEntity } from '../roles/roles.entity';
import { RoomsEntity } from '../chat/rooms/entities/room.entity';
import { ChatLogEntity } from '../chat/private/entities/chat-log.entity';
import { ChatContactEntity } from '../chat/private/entities/chat-contact.entity';
import { RoomBannedUsersEntity } from '../chat/rooms/entities/room_banned_users';

@Entity('admin_user')
export class AdminuserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: ''})
  token: string;

  @Column({default: ''})
  ip_address: string;

  @Column()
  username: string;

  @Column()
  @IsEmail()
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
  role: string;
  
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

  @ManyToOne(type => RolesEntity, roles => roles.adminusers)
  roles: RolesEntity;

  
  @OneToMany(type => RoomsEntity, room=>room.adminuser)
  @JoinColumn()
  rooms: RoomsEntity[];

  @OneToMany(type => ChatLogEntity, chat_log=>chat_log.sender_admin)
  @JoinColumn()
  chat_logs: ChatLogEntity[];

  @OneToMany(type => ChatLogEntity, chat_log=>chat_log.recipient_admin)
  @JoinColumn()
  chat_logs_rec: ChatLogEntity[];

  @OneToMany(type => ChatContactEntity, chat_contact=>chat_contact.owner_admin)
  @JoinColumn()
  chat_contacts: ChatContactEntity[];

  @OneToMany(type => ChatContactEntity, chat_contact=>chat_contact.admin_user)
  @JoinColumn()
  contact_users: ChatContactEntity[];

  @OneToMany(type => RoomBannedUsersEntity, room_banned=>room_banned.adminuser)
  @JoinColumn()
  banned_users: RoomBannedUsersEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
    this.created = new Date;
  }
  
}
