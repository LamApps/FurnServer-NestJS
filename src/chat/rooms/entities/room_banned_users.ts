import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RoomsEntity } from './room.entity';
import { UserEntity } from '../../../user/user.entity';
import { AdminuserEntity } from '../../../adminuser/adminuser.entity';

@Entity('nest_room_banned_users')
export class RoomBannedUsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => RoomsEntity, room => room.id)
  room: RoomsEntity;

  @ManyToOne(type => UserEntity, user => user.id)
  user: UserEntity;

  @ManyToOne(type => AdminuserEntity, adminuser => adminuser.id)
  adminuser: AdminuserEntity;
}