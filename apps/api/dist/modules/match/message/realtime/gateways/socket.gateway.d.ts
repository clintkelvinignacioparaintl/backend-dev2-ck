import { Server } from 'socket.io';
export declare class SocketGateway {
    server: Server;
    notifyUser(userId: string, payload: any): void;
}
