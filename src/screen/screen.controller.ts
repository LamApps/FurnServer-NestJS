import {Get, Post, Body, Put, Delete, Query, Param, Controller, UseInterceptors, UploadedFile, UploadedFiles, Req} from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../user/user.decorator';
import { diskStorage } from 'multer';

import {
    ApiBearerAuth,
    ApiResponse,
    ApiOperation, ApiTags,
} from '@nestjs/swagger';
import { ScreenService } from './screen.service';
import { ScreenRO, ScreensRO } from './screen.interface';
import { FileInterceptor, FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ScreenDto } from './screen.dto';
import { UserEntity } from '../user/user.entity';
import { UserRO } from '../user/user.interface';
import { editFileName, imageFileFilter } from './file.util';
import { extname } from 'path';
import * as path from 'path';
import * as fs from 'fs';

@ApiBearerAuth()
@ApiTags('screens')
@Controller('screens')
export class ScreenController {
    constructor(private readonly screenService: ScreenService) {}

    @ApiOperation({ summary: 'Get all screens' })
    @ApiResponse({ status: 200, description: 'Return all screens.'})
    @Get()
    async findAll(@Query() query): Promise<ScreensRO> {
      return await this.screenService.findAll(query);
    }

    @ApiOperation({ summary: 'Add new screen'})
    @UseInterceptors(FileInterceptor('photo', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const currentDate = new Date();
                const timestamp = currentDate.getTime();
                const ext = extname(file.originalname);
                return callback(null, `${timestamp}${ext}`);
            }
        })
    }))
    @Post()
    async createScreen(@Body() params, @UploadedFile() photo) {
        return await this.screenService.addScreen(params, photo);
    }

    // @ApiOperation({ summary: 'Get Image url'})
    // @Get('image/:filename')
    // async image(@Param('filename') filename: string): Promise<Buffer> {
    //     const filepath = path.join(__dirname, '..', '..', 'uploads', `${filename}`);
	// 	const file = await new Promise<Buffer>((resolve, reject) => {
	// 		fs.readFile(filepath, {}, (err, data) => {
	// 			if (err) {
	// 				reject(err);
	// 			} else {
	// 				resolve(data);
	// 			}
	// 		});
	// 	});
	// 	return file;
    // }
}
