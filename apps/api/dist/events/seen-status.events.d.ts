export declare class MessageSeenEvent {
    readonly messageId: string;
    readonly userId: string;
    readonly conversationId: string;
    readonly timestamp: Date;
    constructor(messageId: string, userId: string, conversationId: string, timestamp?: Date);
}
export declare class ConversationSeenEvent {
    readonly conversationId: string;
    readonly userId: string;
    readonly messageIds: string[];
    readonly timestamp: Date;
    constructor(conversationId: string, userId: string, messageIds: string[], timestamp?: Date);
}
