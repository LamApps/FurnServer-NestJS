import mysqldump from 'mysqldump';
import { HttpStatus, Injectable } from '@nestjs/common';
import { BackupEntity } from './backup.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class UtilsService {
  async backup() {
    const date = new Date();
    const timestamp = date.getTime();
    const filename = `dump_${timestamp}.sql`;

    const result = await mysqldump({
      connection: {
          host: 'localhost',
          user: 'root',
          password: 'Spurlock26!',
          database: 'invoice',
      },
      dumpToFile: './backup_furnserve/' + filename,
    });

    if (!result) {
      return {
        status: HttpStatus.EXPECTATION_FAILED,
        message: 'Can not create backup.'
      };
    }

    let backup = new BackupEntity();
    backup.created = date;
    backup.filename = filename;

    const saved = await getRepository(BackupEntity).save(backup);
    return { item: saved }
  }

  async findAll() {
    const qb = await getRepository(BackupEntity)
      .createQueryBuilder('backup');

    const backups = await qb.getMany();
    return { items: backups, totalCount: backups.length }
  }

  async findOne(id: number) {
    const backup = await getRepository(BackupEntity)
      .createQueryBuilder('backup')
      .where('id = :id', { id: id })
      .getOne();

    if (!backup) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not backup.'
      };
    }
    return { item : backup };
  }

  async remove(id: number) {
    const backup = await getRepository(BackupEntity)
      .createQueryBuilder('backup')
      .where('id = :id', { id: id })
      .getOne();

    if (!backup) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'There is not backup.'
      }
    }
    return await getRepository(BackupEntity)
      .delete({id: id});
  }
}