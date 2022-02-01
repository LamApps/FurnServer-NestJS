import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation } from '@nestjs/swagger';
import { ApiService } from './api.service';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {

  }

  @Post('getPasswords')
  async getPasswords(@Body("app_id") app_id: string) {
    return this.apiService.getPasswords(app_id);
  }

  @Post('checkLicense')
  async checkLicense(@Body() body: any) {
    return this.apiService.checkLicense(body);
  }

  @Post('addQRCode')
  async addQRCode(@Body("code") code: string) {
    return this.apiService.addQRCode(code);
  }

  @Post('getQRCode')
  async getQRCode(@Body("id") id: number) {
    return this.apiService.getQRCode(id);
  }

  @ApiOperation({ summary: 'Add Pdf'})
  @UseInterceptors(FileInterceptor('pdf', {
      storage: diskStorage({
          destination: './uploads',
          filename: (req, file, callback) => {
              return callback(null, `${file.originalname}`);
          }
      })
  }))
  @Post('sendEmail')
  async sendEmail(@UploadedFile() pdf, @Body() params) {
    return this.apiService.sendEmail(params, pdf);
  }
}
