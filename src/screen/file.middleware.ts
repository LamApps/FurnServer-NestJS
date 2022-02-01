import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class FileMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    res = req.Body;
    next();
  }
}
