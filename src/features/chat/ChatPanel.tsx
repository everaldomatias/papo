import styles from "./ChatPanel.module.scss";
import type { Conversation, Message } from "../../types/chat";
import { Avatar } from "../../components/Avatar";
import { Icon } from "../../components/Icon";
import { MessageList } from "./MessageList";
import { MessageComposer } from "./MessageComposer";

type Props = {
  conversation: Conversation;
  messages: readonly Message[];
  isNarrow: boolean;
  onBack: () => void;
  onSend: (text: string) => void;
  onOpenMenu: () => void;
};

export function ChatPanel({ conversation, messages, isNarrow, onBack, onSend, onOpenMenu }: Props) {
  const title = conversation.participant.age
    ? `${conversation.participant.name}, ${conversation.participant.age}`
    : conversation.participant.name;

  return (
    <section className={styles.panel} aria-label="Chat">
      <header className={styles.header}>
        <div className={styles.left}>
          {isNarrow && (
            <button className={styles.iconBtn} type="button" onClick={onBack} aria-label="Voltar">
              <Icon name="back" />
            </button>
          )}
          <Avatar name={conversation.participant.name} isOnline={conversation.participant.isOnline} size="sm" />
          <div className={styles.title}>
            <div className={styles.name}>{title}</div>
            <div className={styles.status}>{conversation.participant.isOnline ? "Online" : "Offline"}</div>
          </div>
        </div>
        <button className={styles.iconBtn} type="button" aria-label="Menu" onClick={onOpenMenu}>
          <Icon name="more" />
        </button>
      </header>

      <MessageList messages={messages} />

      <MessageComposer onSend={onSend} />
    </section>
  );
}
