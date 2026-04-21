import { useEffect } from "react";
import styles from "./MenuDrawer.module.scss";

export type MenuItem = {
  key: string;
  label: string;
  onClick: () => void;
};

type Props = {
  open: boolean;
  title?: string;
  items: readonly MenuItem[];
  onClose: () => void;
};

export function MenuDrawer({ open, title = "Menu", items, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label={title}>
      <button className={styles.backdrop} type="button" onClick={onClose} aria-label="Fechar menu" />
      <aside className={styles.drawer}>
        <div className={styles.top}>
          <div className={styles.title}>{title}</div>
          <button className={styles.close} type="button" onClick={onClose} aria-label="Fechar">
            ×
          </button>
        </div>

        <div className={styles.list}>
          {items.map((it) => (
            <button
              key={it.key}
              className={styles.item}
              type="button"
              onClick={() => {
                it.onClick();
                onClose();
              }}
            >
              {it.label}
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}

