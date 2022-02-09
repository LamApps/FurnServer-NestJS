import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinColumn, AfterUpdate, BeforeUpdate, BeforeInsert } from 'typeorm';
import { CompanyEntity } from '../company/company.entity';

@Entity('apps')
export class AppsEntity {

  @PrimaryGeneratedColumn()
  id: number;
 
  @Column()
  app_id: string;   

  @Column({ type: 'datetime', default: () => "CURRENT_TIMESTAMP"})
  expire_date: Date;

  @Column()
  first_time_status: boolean;

  @Column()
  menu_password: string;

  @Column()
  active: boolean;

  @ManyToOne(type => CompanyEntity, company => company.apps)
  companies: CompanyEntity;
}
