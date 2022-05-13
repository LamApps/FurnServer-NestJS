import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RoomsEntity } from './room.entity';
import { UserEntity } from '../../../user/user.entity';
import { AdminuserEntity } from '../../../adminuser/adminuser.entity';

@Entity('nest_room_log')
export class RoomLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: ''})
  message: string;

  @Column({ type: 'datetime', default: () => "CURRENT_TIMESTAMP"})
  sended: Date;

  @ManyToOne(type => UserEntity, user => user.id)
  sender: UserEntity;

  @ManyToOne(type => AdminuserEntity, adminuser => adminuser.id)
  sender_admin: AdminuserEntity;

  @ManyToOne(type => RoomsEntity, room => room.id)
  room: RoomsEntity;
}