import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository, getRepository } from 'typeorm';
import { CompanyEntity } from '../../company/company.entity';
import { UserEntity } from '../../user/user.entity';
import { AdminuserEntity } from '../../adminuser/adminuser.entity';
import { ChatLogEntity } from './entities/chat-log.entity';
import { ChatContactEntity } from './entities/chat-contact.entity';

@Injectable()
export class PrivateService {
  constructor(
    @InjectRepository(ChatLogEntity)
    private readonly logRepository: Repository<ChatLogEntity>,
    @InjectRepository(ChatContactEntity)
    private readonly contactRepository: Repository<ChatContactEntity>,
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AdminuserEntity)
    private readonly adminUserRepository: Repository<AdminuserEntity>
  ) {}

  async addContact(id: number, contact: CreateContactDto) {
    const entity = new ChatContactEntity();
    const saveContact = await this.contactRepository.save(entity);
    if(contact.isAdmin) {
      const contactRepo = await this.adminUserRepository.findOne({ where: { id: id }, relations: ['chat_contacts'] });
      contactRepo.chat_contacts.push(saveContact);
      await this.adminUserRepository.save(contactRepo); 
    }else{
      const contactRepo = await this.userRepository.findOne({ where: { id: id }, relations: ['chat_contacts'] });
      contactRepo.chat_contacts.push(saveContact);
      await this.userRepository.save(contactRepo); 
    }
    
    if(contact.target.company){
      const contactTargetRepo = await this.userRepository.findOne({ where: { id: contact.target.id }, relations: ['contact_users'] });
      contactTargetRepo.contact_users.push(saveContact);
      await this.userRepository.save(contactTargetRepo); 
    }else{
      const contactTargetRepo = await this.adminUserRepository.findOne({ where: { id: contact.target.id }, relations: ['contact_users'] });
      contactTargetRepo.contact_users.push(saveContact);
      await this.adminUserRepository.save(contactTargetRepo); 
    }
    return this.getContacts(id, contact.isAdmin?'true':'false');
  }

  async getAllUsers(id: number, cp: number, flag, slug: string) {
    let adminUsers = [];
    if(flag=='true'){
      adminUsers = await this.adminUserRepository
      .createQueryBuilder('adminusers')
      .select(['adminusers.id', 'adminusers.firstname', 'adminusers.lastname', 'adminusers.photo'])
      .where('adminusers.active = :active', {active: true})
      .andWhere('(LOWER(adminusers.firstname) LIKE :slug OR LOWER(adminusers.lastname) LIKE :slug)', { slug: `%${slug}%` })
      .andWhere('adminusers.id != :id', {id})
      .getMany();
    }

    let qb = this.userRepository
    .createQueryBuilder('users')
    .leftJoin('users.company', 'company')
    .select(['users.id', 'users.firstname', 'users.lastname', 'users.photo', 'company'])
    .where('users.active = :active', {active: true})
    .andWhere('users.deleted = :deleted', {deleted: false})
    if(flag=='false') {
      qb = qb.andWhere('users.id != :id', {id})
      .andWhere('company.id = :cp', {cp});
    }
    qb = qb.andWhere('(LOWER(users.firstname) LIKE :slug OR LOWER(users.lastname) LIKE :slug)', { slug: `%${slug}%` })
    const users = await qb.getMany();

    return { items: [...adminUsers, ...users] }
  }

  async getContacts(id: number, flag) {
    let qb = this.contactRepository
    .createQueryBuilder('contacts');
    if(flag=='true') qb = qb.leftJoin('contacts.owner_admin', 'owner_admin');
    else qb = qb.leftJoin('contacts.owner', 'owner')
    qb = qb.leftJoin('contacts.admin_user', 'admin_user')
    .leftJoin('contacts.user', 'user')
    .leftJoin('user.company', 'company')
    .addSelect(['admin_user.id','admin_user.firstname','admin_user.lastname','admin_user.photo'])
    .addSelect(['user.id','user.firstname','user.lastname','user.photo','user.company'])
    .addSelect('company');
    if(flag=='true') qb = qb.where('contacts.owner_admin = :id', {id: id});
    else qb = qb.where('contacts.owner = :id', {id: id});
    const contacts = await qb.getMany();

    return contacts
  }

  async getChatLog(myId, myFlag, yourId, yourFlag) {
    let qb = this.logRepository
    .createQueryBuilder('log')
    .leftJoin('log.sender_admin', 'sender_admin')
    .leftJoin('log.sender', 'sender')
    .leftJoin('log.recipient_admin', 'recipient_admin')
    .leftJoin('log.recipient', 'recipient')
    .addSelect('sender_admin.id')
    .addSelect('sender.id')
    .addSelect('recipient_admin.id')
    .addSelect('recipient.id')
    .where('log.deleted = :deleted', {deleted: false});
    
    if(myFlag=='true' && yourFlag=='true') qb = qb.andWhere("((log.sender_admin = :myId AND log.recipient_admin = :yourId) OR (log.recipient_admin = :myId AND log.sender_admin = :yourId))", {myId, yourId});
    else if(myFlag=='true' && yourFlag=='false') qb = qb.andWhere("((log.sender_admin = :myId AND log.recipient = :yourId) OR (log.recipient_admin = :myId AND log.sender = :yourId))", {myId, yourId});
    else if(myFlag=='false' && yourFlag=='true') qb = qb.andWhere("((log.sender = :myId AND log.recipient_admin = :yourId) OR (log.recipient = :myId AND log.sender_admin = :yourId))", {myId, yourId});
    else if(myFlag=='false' && yourFlag=='false') qb = qb.andWhere("((log.sender = :myId AND log.recipient = :yourId) OR (log.recipient = :myId AND log.sender = :yourId))", {myId, yourId});

    this.setReadMessage(myId, myFlag, yourId, yourFlag);
    
    return await qb.getMany();
  }

  async setReadMessage(myId, myFlag, yourId, yourFlag) {
    let qb = this.logRepository.createQueryBuilder()
    .update(ChatLogEntity)
    .set({read: true});
    qb = qb.where("nest_chat_log.read = :read", { read: false });
    if(yourFlag=='true') qb = qb.andWhere("nest_chat_log.senderAdminId = :yourId", { yourId });
    else qb = qb.andWhere("nest_chat_log.senderId = :yourId", { yourId });
    if(myFlag=='true') qb = qb.andWhere("nest_chat_log.recipientAdminId = :myId", { myId })
    else qb = qb.andWhere("nest_chat_log.recipientId = :myId", { myId })
    return await qb.execute();
  }

  async saveChatLog(sender:any, receipent: any, message: string) {
    let log = new ChatLogEntity();
    log.message = message;
    const saveLog = await this.logRepository.save(log);

    if(sender.company==='Admin') {
      const chat_log = await this.adminUserRepository.findOne({ where: { id: sender.userId }, relations: ['chat_logs'] });
      chat_log.chat_logs.push(saveLog);
      await this.adminUserRepository.save(chat_log); 
    }else{
      const chat_log = await this.userRepository.findOne({ where: { id: sender.userId }, relations: ['chat_logs'] });
      chat_log.chat_logs.push(saveLog);
      await this.userRepository.save(chat_log); 
    }

    if(receipent.company) {
      const chat_log = await this.userRepository.findOne({ where: { id: receipent.id }, relations: ['chat_logs_rec'] });
      chat_log.chat_logs_rec.push(saveLog);
      await this.userRepository.save(chat_log); 
    }else{
      const chat_log = await this.adminUserRepository.findOne({ where: { id: receipent.id }, relations: ['chat_logs_rec'] });
      chat_log.chat_logs_rec.push(saveLog);
      await this.adminUserRepository.save(chat_log); 
    }

    let qb = this.contactRepository
    .createQueryBuilder('contacts');
    if(receipent.company) qb = qb.leftJoin('contacts.owner', 'owner');
    else qb = qb.leftJoin('contacts.owner_admin', 'owner_admin');
    qb = qb.leftJoin('contacts.admin_user', 'admin_user')
    .leftJoin('contacts.user', 'user')
    if(receipent.company) qb = qb.where('contacts.owner = :id', {id: receipent.id});
    else qb = qb.where('contacts.owner_admin = :id', {id: receipent.id});
    if(sender.company==='Admin') qb = qb.andWhere('contacts.admin_user = :admin_user', {admin_user: sender.userId});
    else qb = qb.andWhere('contacts.user = :user', {user: sender.userId});
    const contacts = await qb.getCount();

    if(contacts==0) {
      const entity = new ChatContactEntity();
      const saveContact = await this.contactRepository.save(entity);
      if(receipent.company) {
        const contactRepo = await this.userRepository.findOne({ where: { id: receipent.id }, relations: ['chat_contacts'] });
        contactRepo.chat_contacts.push(saveContact);
        await this.userRepository.save(contactRepo); 
      }else{
        const contactRepo = await this.adminUserRepository.findOne({ where: { id: receipent.id }, relations: ['chat_contacts'] });
        contactRepo.chat_contacts.push(saveContact);
        await this.adminUserRepository.save(contactRepo); 
      }
      
      if(sender.company==='Admin'){
        const contactTargetRepo = await this.adminUserRepository.findOne({ where: { id: sender.userId }, relations: ['contact_users'] });
        contactTargetRepo.contact_users.push(saveContact);
        await this.adminUserRepository.save(contactTargetRepo); 
        return 'success';
      }else{
        const contactTargetRepo = await this.userRepository.findOne({ where: { id: sender.userId }, relations: ['contact_users'] });
        contactTargetRepo.contact_users.push(saveContact);
        await this.userRepository.save(contactTargetRepo); 
        return 'success';
      }
    }
    else return 'success';
  }

  async getUnreadMessages(myId, myFlag) {
    let qb = this.logRepository
    .createQueryBuilder('log')
    .leftJoin('log.sender_admin', 'sender_admin')
    .leftJoin('log.sender', 'sender');
    if(myFlag=='true') qb = qb.leftJoin('log.recipient_admin', 'recipient_admin');
    else qb = qb.leftJoin('log.recipient', 'recipient');
    qb = qb.addSelect('sender_admin.id')
      .addSelect('sender.id');
    if(myFlag=='true') qb = qb.addSelect('recipient_admin.id');
    else qb = qb.addSelect('recipient.id');
    qb = qb.where('log.deleted = :deleted', {deleted: false})
      .andWhere('log.read = :read', {read: false});
    if(myFlag=='true') qb = qb.andWhere('log.recipient_admin = :myId', {myId});
    else qb = qb.andWhere('log.recipient = :myId', {myId});

    return await qb.getMany();

  }

  async deleteContact(contactId) {
    const room = await this.contactRepository.findOne({ id: contactId });
    if (!room) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not a room.'
      }
    }
    return await this.contactRepository.delete({ id: contactId });
  }

  async deleteChatLog(myId, myFlag, yourId, yourFlag) {
    let qb = this.logRepository.createQueryBuilder()
    .update(ChatLogEntity)
    .set({deleted: true});
    if(myFlag=='true') qb = qb.where("nest_chat_log.senderAdminId = :myId", { myId });
    else qb = qb.where("nest_chat_log.senderId = :myId", { myId });
    if(yourFlag=='true') qb = qb.andWhere("nest_chat_log.recipientAdminId = :yourId", { yourId })
    else qb = qb.andWhere("nest_chat_log.recipientId = :yourId", { yourId })
    return await qb.execute();
  }

  async findOne(id: number) {
    const room = await this.logRepository.findOne({ where: { id: id }, relations: ['company', 'user', 'adminuser'] });
    if (!room) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not a room.'
      };
    }
    return { item : room };
  }

  async findPublicOne(id: number) {
    // const room = await this.logRepository.findOne({ where: { id: id } });
    // if (!room) {
    //   return {
    //     status: HttpStatus.BAD_REQUEST,
    //     message: 'There is not a room.'
    //   };
    // }
    // if(room.password == "") room.password = "0";
    // else room.password = "1";
    // return { item : room };
  }

  async remove(id: number) {
    const room = await this.logRepository.findOne({ id: id });
    if (!room) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not a room.'
      }
    }
    return await this.logRepository.delete({ id: id });
  }
}
