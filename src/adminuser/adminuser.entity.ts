import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, JoinTable, ManyToMany, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import { IsEmail } from 'class-validator';
import * as argon2 from 'argon2';
import { DeviceEntity } from '../device/device.entity';
import { Role } from '../enum/role.enum';
import { RolesEntity } from '../roles/roles.entity';

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


  @ManyToOne(type => RolesEntity, roles => roles.adminusers)
  roles: RolesEntity;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
    this.created = new Date;
  }
  
}
