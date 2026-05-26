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
exports.NotificationGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const notification_service_1 = require("./notification.service");
let NotificationGateway = class NotificationGateway {
    constructor(notificationService) {
        this.notificationService = notificationService;
        this.users = new Map();
    }
    handleConnection(client) {
        const userId = client.handshake.query.userId;
        if (userId) {
            this.users.set(userId, client.id);
            client.join(`user:${userId}`);
            console.log(`User ${userId} connected for notifications`);
        }
    }
    handleDisconnect(client) {
        const userId = this.findUserIdBySocketId(client.id);
        if (userId) {
            this.users.delete(userId);
            client.leave(`user:${userId}`);
            console.log(`User ${userId} disconnected from notifications`);
        }
    }
    findUserIdBySocketId(socketId) {
        for (const [userId, id] of this.users.entries()) {
            if (id === socketId)
                return userId;
        }
        return undefined;
    }
    async sendNotificationToUser(userId, notification) {
        this.server.to(`user:${userId}`).emit('notification', notification);
    }
    async sendNotificationToMultipleUsers(userIds, notification) {
        const rooms = userIds.map((id) => `user:${id}`);
        this.server.to(rooms).emit('notification', notification);
    }
    handleSubscribeToNotifications(client, userId) {
        client.join(`user:${userId}`);
        console.log(`Socket ${client.id} subscribed to notifications for user ${userId}`);
    }
    handleUnsubscribeFromNotifications(client, userId) {
        client.leave(`user:${userId}`);
        console.log(`Socket ${client.id} unsubscribed from notifications for user ${userId}`);
    }
};
exports.NotificationGateway = NotificationGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotificationGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('subscribeToNotifications'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], NotificationGateway.prototype, "handleSubscribeToNotifications", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('unsubscribeFromNotifications'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], NotificationGateway.prototype, "handleUnsubscribeFromNotifications", null);
exports.NotificationGateway = NotificationGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: process.env.CORS_ORIGIN?.split(',') || process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
        },
    }),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationGateway);
//# sourceMappingURL=notification.gateway.js.map