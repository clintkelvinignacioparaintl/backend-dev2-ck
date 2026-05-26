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
exports.NotificationController = void 0;
const common_1 = require("@nestjs/common");
const notification_service_1 = require("./notification.service");
let NotificationController = class NotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async getUserNotifications(userId, page, limit) {
        return this.notificationService.getUserNotifications(userId, page ? parseInt(page) : 1, limit ? parseInt(limit) : 20);
    }
    async getUnreadCount(userId) {
        const count = await this.notificationService.getUnreadCount(userId);
        return { count };
    }
    async createNotification(dto) {
        return this.notificationService.create(dto);
    }
    async markAsRead(notificationId, userId) {
        return this.notificationService.markAsRead(notificationId, userId);
    }
    async markAllAsRead(userId) {
        await this.notificationService.markAllAsRead(userId);
        return { success: true };
    }
    async deleteNotification(notificationId, userId) {
        await this.notificationService.deleteNotification(notificationId, userId);
        return { success: true };
    }
    async sendMatchNotification(userId, matchedUserId) {
        return this.notificationService.sendMatchNotification(userId, matchedUserId);
    }
    async sendMessageNotification(userId, body) {
        return this.notificationService.sendMessageNotification(userId, body.conversationId, body.senderName);
    }
    async sendSwipeNotification(userId, body) {
        return this.notificationService.sendSwipeNotification(userId, body.swiperName);
    }
    async sendProfileViewNotification(userId, body) {
        return this.notificationService.sendProfileViewNotification(userId, body.viewerName);
    }
};
exports.NotificationController = NotificationController;
__decorate([
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getUserNotifications", null);
__decorate([
    (0, common_1.Get)(':userId/unread'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getUnreadCount", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "createNotification", null);
__decorate([
    (0, common_1.Put)(':notificationId/read/:userId'),
    __param(0, (0, common_1.Param)('notificationId')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Put)(':userId/read-all'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "markAllAsRead", null);
__decorate([
    (0, common_1.Delete)(':notificationId/:userId'),
    __param(0, (0, common_1.Param)('notificationId')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "deleteNotification", null);
__decorate([
    (0, common_1.Post)('match/:userId/:matchedUserId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('matchedUserId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "sendMatchNotification", null);
__decorate([
    (0, common_1.Post)('message/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "sendMessageNotification", null);
__decorate([
    (0, common_1.Post)('swipe/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "sendSwipeNotification", null);
__decorate([
    (0, common_1.Post)('profile-view/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "sendProfileViewNotification", null);
exports.NotificationController = NotificationController = __decorate([
    (0, common_1.Controller)('notifications'),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationController);
//# sourceMappingURL=notification.controller.js.map