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
import { SECRET } from '../config';
import { PrivateService } from './private/private.service';
import { RoomsService } from './rooms/rooms.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    private privateService: PrivateService,
    private roomService: RoomsService,
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
    client.data = {...client.data, room: room};
    client.join(room);
    this.emitRoomUser(room);
  }
  @SubscribeMessage('roomMessage')
  async onRoomMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    const roomName = client.data.room;
    if(roomName) {
      client.to(roomName).emit('roomMessage', {id: client.id, name: client.data.name, message: data, avatar: client.data.avatar, userId: client.data.userId});
    }
  }
  @SubscribeMessage('leaveRoom')
  async onLeaveRoom(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    const room = client.data.room;
    client.data.room = null;
    client.leave(room);
    this.emitRoomUser(room);
  }
  @SubscribeMessage('clearRoomMessages')
  async onClearRoomMessages(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    const room = client.data.room;
    client.to(room).emit('clearRoomMessages');
  }

  @SubscribeMessage('kickUser')
  async onKickUser(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    const room = client.data.room;
    const kick_socket = this.server.sockets.sockets.get(data.id);
    await kick_socket.leave(room);
    this.server.of('/').to(data.id).emit('kickUser');
    this.emitRoomUser(room);
  }
  
  @SubscribeMessage('banUser')
  async onBanUser(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    const room = client.data.room;
    const kick_socket = this.server.sockets.sockets.get(data.id);
    await kick_socket.leave(room);
    this.server.of('/').to(data.id).emit('banUser');
    this.emitRoomUser(room);
    this.roomService.banUser(room, data);
  }

  @SubscribeMessage('getUserList')
  async onGetUserList(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    this.emitUserList();
  }
  @SubscribeMessage('getConnectedUsers')
  async onGetConnectedUsers(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    const clientList = await this.server.of('/').fetchSockets();
    const userList = {};
    clientList.map(clientSocket=>{
      userList[clientSocket.data.userId+'_'+clientSocket.data.company] = {id: clientSocket.id, status: clientSocket.data.status}
    });
    return userList;
  }

  @SubscribeMessage('privateMessage')
  async onPrivateMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    const result = await this.privateService.saveChatLog({
      userId: client.data.userId,
      company: client.data.company
    }, data.receipent, data.message);
    if(result==='success' && data.receipent.socketId){
      this.server.of('/').to(data.receipent.socketId).emit('privateMessage', {sender: {...client.data}, message: data.message});
    }
  }

  //status change handler
  @SubscribeMessage('statusChange')
  async onStatusChange(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    client.data = {...client.data, status: data};
    this.emitUserList();
    if(client.data.room) {
      this.emitRoomUser(client.data.room);
    }
  }
  

  //login handler
  @SubscribeMessage('userLogin')
  async onUserLogin(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    console.log('userLogin');
    client.data = {name: data.fullName, company: data.company, avatar: data.avatar, userId: data.userId, status: 'success'};
    this.emitUserList();
  }

  //logout handler
  @SubscribeMessage('userLogout')
  async onUserLogout(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    client.disconnect(true);
    this.emitUserList();
  }

  afterInit(server: any) {
      
  }

  async handleConnection(client: Socket, ...args: any[]) {
    const query = client.handshake.query;
    client.data = {name: query.fullName, company: query.company, avatar: query.avatar, userId: query.userId, status: 'success'};
    
    this.emitUserList();

    // const clientList = await this.server.of('/').fetchSockets();
    // const userList = clientList.map(clientSocket=>({id: clientSocket.id, name: clientSocket.data.name, company: clientSocket.data.company, avatar: clientSocket.data.avatar}));
    // this.server.of('/').emit('userList', userList);
  }

  async handleDisconnect(client: Socket) {
    //leave the room
    console.log('disconnect');
    const userRoom = client.data.room;
    if(userRoom){
      this.emitRoomUser(userRoom);
    }
    this.emitUserList();
  }
  async emitRoomUser(roomName) {
    const clientList = await this.server.in(roomName).fetchSockets();
    const userList = clientList.map(clientSocket=>({id: clientSocket.id, name: clientSocket.data.name, company: clientSocket.data.company, avatar: clientSocket.data.avatar, userId: clientSocket.data.userId, status: clientSocket.data.status}));
    this.server.in(roomName).emit('usersRoom', userList);

  }
  async emitUserList() {
    const clientList = await this.server.of('/').fetchSockets();
    const userList = {};
    clientList.map(clientSocket=>{
      userList[clientSocket.data.userId+'_'+clientSocket.data.company] = {id: clientSocket.id, status: clientSocket.data.status}
    });
    this.server.of('/').emit('userList', userList);
  }
}