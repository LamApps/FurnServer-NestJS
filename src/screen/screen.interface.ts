import { UserData } from '../user/user.interface';
import { ScreenEntity } from './screen.entity';

export interface ScreenRO {
  screen: ScreenEntity;
}

export interface ScreensRO {
    screens: ScreenEntity[];
    count: number;
}