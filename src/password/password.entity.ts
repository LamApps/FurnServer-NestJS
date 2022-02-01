import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToMany } from 'typeorm';
import { CompanyPasswordEntity } from '../company-password/company-password.entity';
import { CompanyEntity } from '../company/company.entity';

@Entity('nest_password')
export class PasswordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(type=>CompanyPasswordEntity, password=>password.password)
  passwords: CompanyPasswordEntity[];
}