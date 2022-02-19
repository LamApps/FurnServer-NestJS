import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { RoomsModule } from './rooms/rooms.module';
import { PrivateChatModule } from './private/private.module';

@Module({
	imports: [RoomsModule, PrivateChatModule],
	providers: [ChatGateway],
})
export class ChatModule {}
