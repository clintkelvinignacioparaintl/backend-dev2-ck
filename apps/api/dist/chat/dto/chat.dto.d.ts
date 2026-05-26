export declare class CreateConversationDto {
    matchId: string;
}
export declare class GetMessagesDto {
    conversationId: string;
    page?: number;
    limit?: number;
}
export declare class SendMessageDto {
    conversationId: string;
    senderId: string;
    content: string;
    type?: 'TEXT' | 'IMAGE' | 'FILE';
}
export declare class MarkMessageAsSeenDto {
    messageId: string;
}
export declare class MarkConversationAsSeenDto {
    conversationId: string;
}
