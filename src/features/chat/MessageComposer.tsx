import { useState } from "react";
import styles from "./MessageComposer.module.scss";
import { Icon } from "../../components/Icon";

type Props = {
  onSend: (text: string) => void;
};

export function MessageComposer({ onSend }: Props) {
  const [value, setValue] = useState("");

  function submit() {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  }

  return (
    <form
      className={styles.composer}
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      aria-label="Enviar mensagem"
    >
      <div className={styles.inputWrap}>
        <input
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          placeholder="Message…"
          autoComplete="off"
          maxLength={1000}
        />
        <button className={styles.mic} type="button" aria-label="Áudio (futuro)">
          <Icon name="mic" size={20} />
        </button>
      </div>

      <button className={styles.send} type="submit" aria-label="Enviar">
        <Icon name="send" size={20} />
      </button>
    </form>
  );
}
