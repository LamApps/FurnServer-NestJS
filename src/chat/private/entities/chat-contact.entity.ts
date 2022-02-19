import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CompanyEntity } from '../../../company/company.entity';
import { UserEntity } from '../../../user/user.entity';
import { AdminuserEntity } from '../../../adminuser/adminuser.entity';

@Entity('nest_chat_contact')
export class ChatContactEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type=>UserEntity, user => user.id)
  owner: UserEntity;

  @ManyToOne(type => AdminuserEntity, adminuser => adminuser.id)
  owner_admin: AdminuserEntity;

  @ManyToOne(type => UserEntity, user => user.id)
  user: UserEntity;

  @ManyToOne(type => AdminuserEntity, adminuser => adminuser.id)
  admin_user: AdminuserEntity;
  
}