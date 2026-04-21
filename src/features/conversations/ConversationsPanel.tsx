import { useMemo } from "react";
import styles from "./ConversationsPanel.module.scss";
import type { Conversation, ConversationId } from "../../types/chat";
import { Icon } from "../../components/Icon";
import { Avatar } from "../../components/Avatar";
import { formatClockTime } from "../../utils/time";

type Props = {
  conversations: readonly Conversation[];
  activeConversationId: ConversationId;
  search: string;
  onSearchChange: (value: string) => void;
  onSelectConversation: (id: ConversationId) => void;
  onOpenMenu: () => void;
};

export function ConversationsPanel({
  conversations,
  activeConversationId,
  search,
  onSearchChange,
  onSelectConversation,
  onOpenMenu,
}: Props) {
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return conversations;
    return conversations.filter((c) => c.participant.name.toLowerCase().includes(q));
  }, [conversations, search]);

  return (
    <section className={styles.panel} aria-label="Conversas">
      <header className={styles.header}>
        <button className={styles.iconBtn} type="button" aria-label="Menu" onClick={onOpenMenu}>
          <Icon name="menu" />
        </button>

        <div className={styles.title}>
          <span>Message</span>
          <Icon name="chevronDown" size={18} />
        </div>

        <button className={styles.iconBtn} type="button" aria-label="Buscar">
          <Icon name="search" />
        </button>
      </header>

      <div className={styles.searchWrap}>
        <label className={styles.search} aria-label="Pesquisar conversas">
          <Icon name="search" size={18} />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.currentTarget.value)}
            placeholder="Pesquisar…"
            autoComplete="off"
            inputMode="search"
          />
        </label>
      </div>

      <div className={styles.list} role="list">
        {filtered.map((c) => {
          const isActive = c.id === activeConversationId;
          const displayName = c.participant.age ? `${c.participant.name}, ${c.participant.age}` : c.participant.name;
          return (
            <button
              key={c.id}
              type="button"
              role="listitem"
              className={`${styles.item} ${isActive ? styles.active : ""}`}
              onClick={() => onSelectConversation(c.id)}
            >
              <Avatar name={c.participant.name} isOnline={c.participant.isOnline} />
              <div className={styles.itemBody}>
                <div className={styles.itemTop}>
                  <div className={styles.nameRow}>
                    <span className={styles.name}>{displayName}</span>
                    {c.unreadCount ? <span className={styles.unreadDot} aria-label="Não lida" /> : null}
                  </div>
                  <time className={styles.time} dateTime={c.lastMessageAt}>
                    {formatClockTime(c.lastMessageAt)}
                  </time>
                </div>
                <div className={styles.preview}>{c.lastMessagePreview}</div>
              </div>
            </button>
          );
        })}
      </div>

      <button className={styles.fab} type="button" aria-label="Nova conversa">
        <Icon name="plus" size={22} />
      </button>
    </section>
  );
}
