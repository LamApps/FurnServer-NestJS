import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { CompanyEntity } from '../../../company/company.entity';
import { UserEntity } from '../../../user/user.entity';
import { AdminuserEntity } from '../../../adminuser/adminuser.entity';
import { RoomBannedUsersEntity } from './room_banned_users';
import { RoomLogEntity } from './room-log.entity';

@Entity('nest_rooms')
export class RoomsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: ''})
  name: string;

  @Column({default: ''})
  password: string;

  @Column({ type: 'datetime', default: () => "CURRENT_TIMESTAMP"})
  created: Date;

  @OneToMany(type => RoomBannedUsersEntity, bans=>bans.room)
  @JoinColumn()
  bans: RoomBannedUsersEntity[];

  @OneToMany(type => RoomLogEntity, logs=>logs.room)
  @JoinColumn()
  logs: RoomLogEntity[];

  @ManyToOne(type=>CompanyEntity, company=>company.id)
  company: CompanyEntity;

  @ManyToOne(type => UserEntity, user => user.id)
  user: UserEntity;

  @ManyToOne(type => AdminuserEntity, adminuser => adminuser.id)
  adminuser: AdminuserEntity;
}