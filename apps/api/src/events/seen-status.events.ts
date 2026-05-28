export class MessageSeenEvent {
  constructor(
    public readonly messageId: string,
    public readonly userId: string,
    public readonly conversationId: string,
    public readonly timestamp: Date = new Date(),
  ) {}
}

export class ConversationSeenEvent {
  constructor(
    public readonly conversationId: string,
    public readonly userId: string,
    public readonly messageIds: string[],
    public readonly timestamp: Date = new Date(),
  ) {}
}
