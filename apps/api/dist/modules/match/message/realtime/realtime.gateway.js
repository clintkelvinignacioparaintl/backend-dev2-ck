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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealtimeGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let RealtimeGateway = class RealtimeGateway {
    constructor() {
        this.userSockets = new Map();
        this.socketUsers = new Map();
    }
    handleConnection(client) {
        console.log('✅ Client connected:', client.id);
    }
    handleDisconnect(client) {
        console.log('❌ Client disconnected:', client.id);
        const userId = this.socketUsers.get(client.id);
        if (!userId)
            return;
        const sockets = this.userSockets.get(userId);
        if (sockets) {
            sockets.delete(client.id);
            if (sockets.size === 0) {
                this.userSockets.delete(userId);
                this.server.emit('user_offline', {
                    userId,
                });
            }
        }
        this.socketUsers.delete(client.id);
    }
    handleRegister(client, payload) {
        const { userId } = payload;
        if (!this.userSockets.has(userId)) {
            this.userSockets.set(userId, new Set());
        }
        this.userSockets.get(userId)?.add(client.id);
        this.socketUsers.set(client.id, userId);
        client.join(`user:${userId}`);
        this.server.emit('user_online', {
            userId,
        });
        console.log(`🔥 Registered ${userId} -> ${client.id}`);
        return {
            success: true,
            socketId: client.id,
        };
    }
    handleJoinConversation(client, payload) {
        const room = `conversation:${payload.conversationId}`;
        client.join(room);
        return {
            success: true,
            room,
        };
    }
    handleLeaveConversation(client, payload) {
        const room = `conversation:${payload.conversationId}`;
        client.leave(room);
        return {
            success: true,
        };
    }
    async handleSendMessage(client, payload) {
        const chatPayload = {
            ...payload,
            timestamp: new Date(),
        };
        this.server
            .to(`conversation:${payload.conversationId}`)
            .emit('receive_message', chatPayload);
        client.emit('message_sent', chatPayload);
        return {
            success: true,
        };
    }
    handleTyping(client, payload) {
        client
            .to(`conversation:${payload.conversationId}`)
            .emit('user_typing', payload);
    }
    handleStopTyping(client, payload) {
        client
            .to(`conversation:${payload.conversationId}`)
            .emit('user_stop_typing', payload);
    }
    emitMatch(userId, payload) {
        this.server.to(`user:${userId}`).emit('match', payload);
    }
    emitToUser(userId, event, payload) {
        this.server.to(`user:${userId}`).emit(event, payload);
    }
    emitToConversation(conversationId, event, payload) {
        this.server.to(`conversation:${conversationId}`).emit(event, payload);
    }
    isUserOnline(userId) {
        return this.userSockets.has(userId);
    }
};
exports.RealtimeGateway = RealtimeGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], RealtimeGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('register'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], RealtimeGateway.prototype, "handleRegister", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('join_conversation'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], RealtimeGateway.prototype, "handleJoinConversation", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leave_conversation'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], RealtimeGateway.prototype, "handleLeaveConversation", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('send_message'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], RealtimeGateway.prototype, "handleSendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('typing'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], RealtimeGateway.prototype, "handleTyping", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('stop_typing'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], RealtimeGateway.prototype, "handleStopTyping", null);
exports.RealtimeGateway = RealtimeGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    })
], RealtimeGateway);
//# sourceMappingURL=realtime.gateway.js.map