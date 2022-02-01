import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import { UserEntity } from '../user/user.entity';
export class Company {}

@Entity('nest_backup')
export class BackupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: ''})
  filename: string;

  @Column({ type: 'datetime', default: () => "CURRENT_TIMESTAMP"})
  created: Date;
}