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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const chat_service_1 = require("./chat.service");
let ChatController = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async getConversation(conversationId) {
        return this.chatService.getConversation(conversationId);
    }
    async getConversationByMatchId(matchId) {
        return this.chatService.getConversationByMatchId(matchId);
    }
    async createConversation(matchId) {
        return this.chatService.createConversation(matchId);
    }
    async getMessages(conversationId, page = '1', limit = '50') {
        return this.chatService.getMessages(conversationId, parseInt(page), parseInt(limit));
    }
    async sendMessage(body) {
        return this.chatService.sendMessage(body.conversationId, body.senderId, body.content, body.type || 'TEXT');
    }
    async markMessageAsSeen(messageId, req) {
        return this.chatService.markMessageAsSeen(messageId, req.user.userId);
    }
    async markConversationAsSeen(conversationId, req) {
        return this.chatService.markConversationAsSeen(conversationId, req.user.userId);
    }
    async getUnreadMessageCount(req) {
        return this.chatService.getUnreadMessageCount(req.user.userId);
    }
    async deleteMessage(messageId, req) {
        return this.chatService.deleteMessage(messageId, req.user.userId);
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Get)('conversations/:conversationId'),
    __param(0, (0, common_1.Param)('conversationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getConversation", null);
__decorate([
    (0, common_1.Get)('conversations'),
    __param(0, (0, common_1.Query)('matchId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getConversationByMatchId", null);
__decorate([
    (0, common_1.Post)('conversations'),
    __param(0, (0, common_1.Body)('matchId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "createConversation", null);
__decorate([
    (0, common_1.Get)('messages/:conversationId'),
    __param(0, (0, common_1.Param)('conversationId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Post)('messages'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Post)('messages/:messageId/seen'),
    __param(0, (0, common_1.Param)('messageId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "markMessageAsSeen", null);
__decorate([
    (0, common_1.Post)('conversations/:conversationId/seen'),
    __param(0, (0, common_1.Param)('conversationId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "markConversationAsSeen", null);
__decorate([
    (0, common_1.Get)('unread'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getUnreadMessageCount", null);
__decorate([
    (0, common_1.Delete)('messages/:messageId'),
    __param(0, (0, common_1.Param)('messageId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "deleteMessage", null);
exports.ChatController = ChatController = __decorate([
    (0, common_1.Controller)('chat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map