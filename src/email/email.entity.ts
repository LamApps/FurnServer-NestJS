import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { CompanyEntity } from "../company/company.entity";
import { PasswordEntity } from "../password/password.entity";

@Entity('nest_email')
export class EmailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: ''})
  email: string;

  @Column({default: ''})
  description: string;

  @Column({default: ''})
  store_location: string;

  @Column({default: ''})
  subject_line: string;

  @Column({default: ''})
  name_format: string;
  
  @Column({default: ''})
  body: string;

  @Column({default: true})
  active: boolean;

  @ManyToOne(type=>CompanyEntity, company=>company.id)
  company: CompanyEntity;
}