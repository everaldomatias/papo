import { useEffect, useRef } from "react";
import styles from "./MessageList.module.scss";
import type { Message } from "../../types/chat";
import { MessageBubble } from "./MessageBubble";

type Props = {
  messages: readonly Message[];
};

export function MessageList({ messages }: Props) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length]);

  return (
    <div className={styles.scroller} aria-label="Mensagens">
      <div className={styles.list}>
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
}

