import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { SECRET } from '../config';
import { UserService } from './user.service';
import { AdminuserService } from '../adminuser/adminuser.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
	private readonly userService: UserService, 
	private adminuserService: AdminuserService
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      const decoded: any = jwt.verify(token, SECRET);
	  let handled = false;
	  if (decoded.isAdmin) {		
		const user = await this.adminuserService.find(decoded.id);
		if (user && user.item.token == token) {
			handled = true;
			req.user = user.item;
			next();
		} else {
			if (!user) {
				throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
			} else {
				throw new HttpException('Session expired', 905);
			}
		}
	  } else {		  	
		const user = await this.userService.find(decoded.id);
		if (user && user.item.token) {
			handled = true;
			req.user = user.item;
			next();	
		} else {
			if (!user) {
				throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
			} else {
				throw new HttpException('Session expired', 905);
			}
		}
	  }
	  if (!handled) {  
		throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
      }
    } else {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}
