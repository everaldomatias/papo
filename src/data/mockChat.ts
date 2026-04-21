import type { Conversation, ConversationId, Message } from "../types/chat";

function isoMinutesAgo(minutes: number) {
  return new Date(Date.now() - minutes * 60_000).toISOString();
}

export const mockConversations: readonly Conversation[] = [
  {
    id: "c1",
    participant: { id: "u_kate", name: "Kate", age: 32, isOnline: true },
    lastMessagePreview: "Lorem ipsum dolor sit amet? Consectetuer adipiscing…",
    lastMessageAt: isoMinutesAgo(6),
    unreadCount: 1,
  },
  {
    id: "c2",
    participant: { id: "u_eve", name: "Eve", age: 27, isOnline: false },
    lastMessagePreview: "Lorem ipsum dolor sit amet? Consectetuer adipiscing…",
    lastMessageAt: isoMinutesAgo(28),
  },
  {
    id: "c3",
    participant: { id: "u_suzane", name: "Suzane", age: 33, isOnline: false },
    lastMessagePreview: "Lorem ipsum dolor sit amet? Consectetuer adipiscing…",
    lastMessageAt: isoMinutesAgo(90),
    unreadCount: 1,
  },
  {
    id: "c4",
    participant: { id: "u_john", name: "John", age: 28, isOnline: true },
    lastMessagePreview: "Lorem ipsum dolor sit amet? Consectetuer adipiscing…",
    lastMessageAt: isoMinutesAgo(160),
  },
] as const;

export const mockMessagesByConversationId: Record<ConversationId, readonly Message[]> = {
  c1: [
    {
      id: "m1",
      conversationId: "c1",
      author: "other",
      text: "Lorem ipsum dolor sit amet?\nConsectetuer adipiscing…",
      createdAt: isoMinutesAgo(52),
    },
    { id: "m2", conversationId: "c1", author: "me", text: "Yes! dolor sit amet?", createdAt: isoMinutesAgo(45) },
    {
      id: "m3",
      conversationId: "c1",
      author: "other",
      text: "Lorem ipsum dolor sit amet?\nConsectetuer adipiscing…",
      createdAt: isoMinutesAgo(36),
    },
    { id: "m4", conversationId: "c1", author: "me", text: "Thank U!", createdAt: isoMinutesAgo(29) },
    {
      id: "m5",
      conversationId: "c1",
      author: "other",
      text: "Lorem ipsum dolor sit amet?\nConsectetuer adipiscing ❤️",
      createdAt: isoMinutesAgo(17),
    },
    { id: "m6", conversationId: "c1", author: "me", text: "Can't wait! C U", createdAt: isoMinutesAgo(8) },
  ],
  c2: [
    {
      id: "m7",
      conversationId: "c2",
      author: "other",
      text: "Hey! Tudo bem?",
      createdAt: isoMinutesAgo(130),
    },
    { id: "m8", conversationId: "c2", author: "me", text: "Tudo sim 🙂 e você?", createdAt: isoMinutesAgo(128) },
  ],
  c3: [{ id: "m9", conversationId: "c3", author: "other", text: "Oi! Vamos conversar?", createdAt: isoMinutesAgo(200) }],
  c4: [{ id: "m10", conversationId: "c4", author: "other", text: "Olá!", createdAt: isoMinutesAgo(180) }],
};

