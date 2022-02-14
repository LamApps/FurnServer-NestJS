import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
// import { RoomsService } from './rooms/rooms.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    // private roomsService: RoomsService,
  ){

  }
  @WebSocketServer() server: Server;

  @SubscribeMessage('chat')
  onChat(client: Socket, payload: string): void {
    client.broadcast.emit('chat', payload);
  }

  @SubscribeMessage('getRoomInfo')
  async getRoomInfo(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    const arr = Array.from(this.server.sockets.adapter.rooms);
    const filtered = arr.filter(room => !room[1].has(room[0]));
    const res = filtered.map(i => ({name:i[0], users:i[1].size}));
    return { event: 'roomInfo', data: res };
  }

  @SubscribeMessage('joinRoom')
  async onJoinRoom(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    const room = 'room_' + data.roomId;
    client.leave(room);
    client.data = {room: room, name: data.fullName, company: data.company, avatar: data.avatar};
    client.join(room);
    const clientList = await this.server.in(room).fetchSockets();
    const userList = clientList.map(clientSocket=>({name: clientSocket.data.name, company: clientSocket.data.company, avatar: clientSocket.data.avatar}));
    this.server.in(room).emit('usersRoom', userList);
  }
  @SubscribeMessage('roomMessage')
  async onRoomMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    const roomName = client.data.room;
    if(roomName) {
      client.to(roomName).emit('roomMessage', {sender: client.data.name, message: data, avatar: client.data.avatar});
    }
  }
  @SubscribeMessage('leaveRoom')
  async onLeaveRoom(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    const room = client.data.room;
    client.leave(room);
    const clientList = await this.server.in(room).fetchSockets();
    const userList = clientList.map(clientSocket=>({name: clientSocket.data.name, company: clientSocket.data.company, avatar: clientSocket.data.avatar}));
    client.to(room).emit('usersRoom', userList);
  }
  afterInit(server: Server) {
  }

  async handleDisconnect(client: Socket) {
    //leave the room
    const userRoom = client.data.room;
    const clientList = await this.server.in(userRoom).fetchSockets();
    const userList = clientList.map(clientSocket=>clientSocket.data.name);
    client.in(userRoom).emit('usersRoom', userList);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    // const clientList = this.server.of('/').adapter.rooms;
    // console.log(clientList);
  }
}