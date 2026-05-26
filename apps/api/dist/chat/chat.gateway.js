"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let ChatGateway = class ChatGateway {
    constructor() {
        this.users = new Map();
    }
    handleConnection(client) {
        const userId = client.handshake.query.userId;
        if (userId) {
            this.users.set(userId, client.id);
            console.log(`User ${userId} connected with socket ${client.id}`);
        }
    }
    handleDisconnect(client) {
        const userId = this.findUserIdBySocketId(client.id);
        if (userId) {
            this.users.delete(userId);
            console.log(`User ${userId} disconnected`);
        }
    }
    findUserIdBySocketId(socketId) {
        for (const [userId, id] of this.users.entries()) {
            if (id === socketId)
                return userId;
        }
        return undefined;
    }
    handleJoinConversation(client, conversationId) {
        client.join(conversationId);
        console.log(`Socket ${client.id} joined conversation ${conversationId}`);
    }
    handleLeaveConversation(client, conversationId) {
        client.leave(conversationId);
        console.log(`Socket ${client.id} left conversation ${conversationId}`);
    }
    handleSendMessage(client, payload) {
        this.server.to(payload.conversationId).emit('newMessage', payload.message);
    }
    handleTyping(client, payload) {
        client.to(payload.conversationId).emit('userTyping', payload.userId);
    }
    handleStopTyping(client, payload) {
        client.to(payload.conversationId).emit('userStopTyping', payload.userId);
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinConversation'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleJoinConversation", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveConversation'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleLeaveConversation", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleSendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('typing'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleTyping", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('stopTyping'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleStopTyping", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    })
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map