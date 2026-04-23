interface MessageDatabase {
  createMessage(message: any): Promise<void>;
  updateMessage(message: any): Promise<void>;
  getMessage(messageId: string): Promise<any>;
}
