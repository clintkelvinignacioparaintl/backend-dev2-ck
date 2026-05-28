"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationSeenEvent = exports.MessageSeenEvent = void 0;
class MessageSeenEvent {
    constructor(messageId, userId, conversationId, timestamp = new Date()) {
        this.messageId = messageId;
        this.userId = userId;
        this.conversationId = conversationId;
        this.timestamp = timestamp;
    }
}
exports.MessageSeenEvent = MessageSeenEvent;
class ConversationSeenEvent {
    constructor(conversationId, userId, messageIds, timestamp = new Date()) {
        this.conversationId = conversationId;
        this.userId = userId;
        this.messageIds = messageIds;
        this.timestamp = timestamp;
    }
}
exports.ConversationSeenEvent = ConversationSeenEvent;
//# sourceMappingURL=seen-status.events.js.map