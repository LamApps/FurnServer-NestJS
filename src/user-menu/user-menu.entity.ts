import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Permission } from "../enum/permission.enum";
import { MenuEntity } from "../menu/menu.entity";
import { UserEntity } from "../user/user.entity";

@Entity('nest_user_menu')
export class UserMenuEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({
    type: 'enum',
    enum: Permission,
    default: Permission.None,
  })
  permission: Permission;

  @ManyToOne(type=>MenuEntity, menu=>menu.id)
  menu: MenuEntity;


  @ManyToOne(type=>UserEntity, user=>user.id)
  user: UserEntity;
}