import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import { UserEntity } from '../user/user.entity';
export class Company {}

@Entity('nest_uuid')
export class UUIDEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: ""})
  unique_id: string;

  @Column({default: ""})
  uuid: string;

  @Column({default: ""})
  description: string;

  @Column({default: ""})
  last_date_verified: string;

  @Column({default: false})
  verified: boolean;

  @Column({default: ""})
  version: string;


  @Column({default: false})
  active: boolean;

  @ManyToOne(type => CompanyEntity, company => company.id)
  company: CompanyEntity;
}