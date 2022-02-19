import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CompanyEntity } from '../../../company/company.entity';
import { UserEntity } from '../../../user/user.entity';
import { AdminuserEntity } from '../../../adminuser/adminuser.entity';

@Entity('nest_chat_log')
export class ChatLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: ''})
  message: string;

  @Column({ type: 'datetime', default: () => "CURRENT_TIMESTAMP"})
  sended: Date;
    
  @Column({default: false})
  read: boolean;

  @Column({default: false})
  deleted: boolean;

  @ManyToOne(type => UserEntity, user => user.id)
  sender: UserEntity;

  @ManyToOne(type => UserEntity, user => user.id)
  recipient: UserEntity;

  @ManyToOne(type => AdminuserEntity, adminuser => adminuser.id)
  sender_admin: AdminuserEntity;

  @ManyToOne(type => AdminuserEntity, adminuser => adminuser.id)
  recipient_admin: AdminuserEntity;
  
}