import styles from "./MessageBubble.module.scss";
import type { Message } from "../../types/chat";
import { formatClockTime } from "../../utils/time";

type Props = {
  message: Message;
};

export function MessageBubble({ message }: Props) {
  const isMe = message.author === "me";
  return (
    <div className={`${styles.row} ${isMe ? styles.me : styles.other}`}>
      <div className={styles.bubble}>
        <div className={styles.text}>
          {message.text.split("\n").map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>
        <time className={styles.time} dateTime={message.createdAt}>
          {formatClockTime(message.createdAt)}
        </time>
      </div>
    </div>
  );
}

