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
exports.SeenStatusGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const seen_status_service_1 = require("./seen-status.service");
const event_emitter_1 = require("@nestjs/event-emitter");
let SeenStatusGateway = class SeenStatusGateway {
    constructor(seenStatusService) {
        this.seenStatusService = seenStatusService;
        this.userSockets = new Map();
    }
    handleBroadcastMessageSeen(data) {
        this.broadcastMessageSeen(data);
    }
    handleBroadcastConversationSeen(data) {
        this.broadcastConversationSeen(data);
    }
    handleConnection(client) {
        const userId = client.handshake.query.userId;
        if (userId) {
            if (!this.userSockets.has(userId)) {
                this.userSockets.set(userId, new Set());
            }
            this.userSockets.get(userId).add(client.id);
            console.log(`User ${userId} connected to seen-status with socket ${client.id}`);
        }
    }
    handleDisconnect(client) {
        const userId = this.findUserIdBySocketId(client.id);
        if (userId) {
            const sockets = this.userSockets.get(userId);
            if (sockets) {
                sockets.delete(client.id);
                if (sockets.size === 0) {
                    this.userSockets.delete(userId);
                }
            }
            console.log(`User ${userId} disconnected from seen-status`);
        }
    }
    findUserIdBySocketId(socketId) {
        for (const [userId, sockets] of this.userSockets.entries()) {
            if (sockets.has(socketId))
                return userId;
        }
        return undefined;
    }
    handleSubscribeToConversation(client, conversationId) {
        const room = `conversation:${conversationId}`;
        client.join(room);
        console.log(`Socket ${client.id} subscribed to conversation ${conversationId}`);
    }
    handleUnsubscribeFromConversation(client, conversationId) {
        const room = `conversation:${conversationId}`;
        client.leave(room);
        console.log(`Socket ${client.id} unsubscribed from conversation ${conversationId}`);
    }
    handleSubscribeToMessage(client, messageId) {
        const room = `message:${messageId}`;
        client.join(room);
        console.log(`Socket ${client.id} subscribed to message ${messageId}`);
    }
    broadcastMessageSeen(data) {
        const room = `message:${data.messageId}`;
        this.server.to(room).emit('messageSeen', {
            messageId: data.messageId,
            userId: data.userId,
            seenAt: data.seenAt,
        });
    }
    broadcastConversationSeen(data) {
        const room = `conversation:${data.conversationId}`;
        this.server.to(room).emit('conversationSeen', {
            conversationId: data.conversationId,
            userId: data.userId,
            seenAt: data.seenAt,
        });
    }
    broadcastUserTyping(data) {
        const room = `conversation:${data.conversationId}`;
        this.server.to(room).emit('userTyping', data);
    }
    broadcastUserStopTyping(data) {
        const room = `conversation:${data.conversationId}`;
        this.server.to(room).emit('userStopTyping', data);
    }
};
exports.SeenStatusGateway = SeenStatusGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], SeenStatusGateway.prototype, "server", void 0);
__decorate([
    (0, event_emitter_1.OnEvent)('gateway.broadcast.message.seen'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SeenStatusGateway.prototype, "handleBroadcastMessageSeen", null);
__decorate([
    (0, event_emitter_1.OnEvent)('gateway.broadcast.conversation.seen'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SeenStatusGateway.prototype, "handleBroadcastConversationSeen", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('subscribeToConversation'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], SeenStatusGateway.prototype, "handleSubscribeToConversation", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('unsubscribeFromConversation'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], SeenStatusGateway.prototype, "handleUnsubscribeFromConversation", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('subscribeToMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], SeenStatusGateway.prototype, "handleSubscribeToMessage", null);
exports.SeenStatusGateway = SeenStatusGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: process.env.CORS_ORIGIN || '*',
        },
        namespace: '/seen-status',
    }),
    __metadata("design:paramtypes", [seen_status_service_1.SeenStatusService])
], SeenStatusGateway);
//# sourceMappingURL=seen-status.gateway.js.map