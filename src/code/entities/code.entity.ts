import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CompanyEntity } from '../../company/company.entity';

@Entity('nest_code')
export class CodeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: ''})
  description: string;

  @Column({default: ''})
  content: string;

  @Column({default: 'All'})
  page: string;

  @Column({default: true})
  active: boolean;

  @ManyToOne(type=>CompanyEntity, company=>company.id)
  @JoinColumn()
  company: CompanyEntity;
}