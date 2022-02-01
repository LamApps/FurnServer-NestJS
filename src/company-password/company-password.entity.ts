import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { CompanyEntity } from "../company/company.entity";
import { PasswordEntity } from "../password/password.entity";

@Entity('nest_company_password')
export class CompanyPasswordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pwd: string;

  @Column()
  description: string;

  @Column()
  has_threshold: boolean;

  @Column()
  threshold: number;

  @ManyToOne(type=>PasswordEntity, password=>password.passwords)
  password: PasswordEntity;

  @ManyToOne(type=>CompanyEntity, company=>company.id)
  company: CompanyEntity;
}