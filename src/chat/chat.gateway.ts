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
import * as socketioJwt from 'socketio-jwt';
import { SECRET } from 'src/config';
import { PrivateService } from './private/private.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    private privateService: PrivateService,
  ){

  }
  @WebSocketServer() server: Server;

  OnGatewayInit(): void {
    this.server.use(socketioJwt.authorize({
      secret: SECRET,
      handshake: true
    }));
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
    client.data = client.data.uid?{...client.data, room: room}:{name: data.fullName, company: data.company, avatar: data.avatar, userId: data.userId};
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

  @SubscribeMessage('getConnectedUsers')
  async onGetConnectedUsers(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    const clientList = await this.server.of('/').fetchSockets();
    const userList = {};
    clientList.map(clientSocket=>{
      userList[clientSocket.data.userId+'_'+clientSocket.data.company] = {id: clientSocket.id, name: clientSocket.data.name, company: clientSocket.data.company, avatar: clientSocket.data.avatar, userId: clientSocket.data.userId}
    });
    return { event: 'userList', data: userList };
  }

  @SubscribeMessage('privateMessage')
  async onPrivateMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    this.privateService.saveChatLog({
      userId: client.data.userId,
      company: client.data.company
    }, data.receipent, data.message);
    if(data.receipent.socketId){
      this.server.of('/').to(data.receipent.socketId).emit('privateMessage', {sender: {...client.data}, message: data.message});
    }
  }

  //login handler
  @SubscribeMessage('userLogin')
  async onUserLogin(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    console.log('userLogin');
    client.data = {name: data.fullName, company: data.company, avatar: data.avatar, userId: data.userId};
    const clientList = await this.server.of('/').fetchSockets();
    const userList = {};
    clientList.map(clientSocket=>{
      userList[clientSocket.data.userId+'_'+clientSocket.data.company] = {id: clientSocket.id, name: clientSocket.data.name, company: clientSocket.data.company, avatar: clientSocket.data.avatar, userId: clientSocket.data.userId}
    });
    this.server.of('/').emit('userList', userList);
  }

  //logout handler
  @SubscribeMessage('userLogout')
  async onUserLogout(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    client.disconnect(true);
    const clientList = await this.server.of('/').fetchSockets();
    const userList = {};
    clientList.map(clientSocket=>{
      userList[clientSocket.data.userId+'_'+clientSocket.data.company] = {id: clientSocket.id, name: clientSocket.data.name, company: clientSocket.data.company, avatar: clientSocket.data.avatar, userId: clientSocket.data.userId}
    });
    this.server.of('/').emit('userList', userList);
  }

  afterInit(server: any) {
      
  }

  async handleConnection(client: Socket, ...args: any[]) {
    const query = client.handshake.query;
    client.data = {name: query.fullName, company: query.company, avatar: query.avatar, userId: query.userId};

    const clientList = await this.server.of('/').fetchSockets();
    const userList = {};
    clientList.map(clientSocket=>{
      userList[clientSocket.data.userId+'_'+clientSocket.data.company] = {id: clientSocket.id, name: clientSocket.data.name, company: clientSocket.data.company, avatar: clientSocket.data.avatar, userId: clientSocket.data.userId}
    });
    this.server.of('/').emit('userList', userList);

    // const clientList = await this.server.of('/').fetchSockets();
    // const userList = clientList.map(clientSocket=>({id: clientSocket.id, name: clientSocket.data.name, company: clientSocket.data.company, avatar: clientSocket.data.avatar}));
    // this.server.of('/').emit('userList', userList);
  }

  async handleDisconnect(client: Socket) {
    //leave the room
    console.log('disconnect');
    const userRoom = client.data.room;
    if(userRoom){
      const clientList = await this.server.in(userRoom).fetchSockets();
      const userList = clientList.map(clientSocket=>({name: clientSocket.data.name, company: clientSocket.data.company, avatar: clientSocket.data.avatar}));
      client.in(userRoom).emit('usersRoom', userList);
    }
    const clientList = await this.server.of('/').fetchSockets();
    const userList = {};
    clientList.map(clientSocket=>{
      userList[clientSocket.data.userId+'_'+clientSocket.data.company] = {id: clientSocket.id, name: clientSocket.data.name, company: clientSocket.data.company, avatar: clientSocket.data.avatar, userId: clientSocket.data.userId}
    });
    this.server.of('/').emit('userList', userList);
  }
}