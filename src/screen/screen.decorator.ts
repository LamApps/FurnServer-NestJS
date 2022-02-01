import { SetMetadata } from '@nestjs/common';

export const Screen = (...args: string[]) => SetMetadata('screen', args);
