import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, OneToMany, JoinColumn, AfterUpdate, BeforeUpdate, BeforeInsert } from 'typeorm';
import { DeviceEntity } from '../device/device.entity';
import { UserEntity } from '../user/user.entity';

@Entity('screen')
export class ScreenEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: ''})
  photo: string;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  created: Date;

  @BeforeInsert()
  createDateTime() {
    this.created = new Date;
  }
  
  @ManyToOne(type => DeviceEntity, device => device.id)
  device: string;

  @ManyToOne(type => UserEntity, user => user.id)
  user: UserEntity;
}