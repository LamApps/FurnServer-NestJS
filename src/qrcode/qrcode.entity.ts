import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('nest_qrcode')
export class QrcodeEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "longtext"})
  code: string;
}