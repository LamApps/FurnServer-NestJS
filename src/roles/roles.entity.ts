import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToMany } from 'typeorm';
import { AdminuserEntity } from '../adminuser/adminuser.entity';

@Entity('admin_roles')
export class RolesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: ''})
  code: string;

  @Column({default: ''})
  name: string;

  @Column({default: ''})
  description: string;

  @OneToMany(type => AdminuserEntity, adminuser => adminuser.roles)
  @JoinColumn()
  adminusers: AdminuserEntity[];
}