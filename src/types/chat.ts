export type ConversationId = `c${number}` | string;

export type Participant = {
  id: string;
  name: string;
  age?: number;
  isOnline?: boolean;
};

export type Conversation = {
  id: ConversationId;
  participant: Participant;
  lastMessagePreview: string;
  lastMessageAt: string;
  unreadCount?: number;
};

export type Message = {
  id: string;
  conversationId: ConversationId;
  author: "me" | "other";
  text: string;
  createdAt: string;
};

