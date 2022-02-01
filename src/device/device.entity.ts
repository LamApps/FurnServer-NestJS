import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, OneToMany, JoinColumn, AfterUpdate, BeforeUpdate, BeforeInsert } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('device')
export class DeviceEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: 0})
  type: number; // 0 - Mac, 1 - Windows, 2 - Android, 3 - iOS

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  created: Date;

  @BeforeInsert()
  createDateTime() {
    this.created = new Date;
  }

  @ManyToOne(type => UserEntity, user => user.id)
  user: UserEntity;
}