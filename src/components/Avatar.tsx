import styles from "./Avatar.module.scss";

type Props = {
  name: string;
  isOnline?: boolean;
  size?: "sm" | "md" | "lg";
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "?";
  const second = parts.length > 1 ? parts[1]?.[0] : "";
  return (first + (second ?? "")).toUpperCase();
}

function pickFlatColor(input: string) {
  const palette = ["#6a35ff", "#2e6bff", "#ff3b5c", "#ff8a00", "#14b8a6", "#8b5cf6"] as const;
  let hash = 0;
  for (let i = 0; i < input.length; i++) hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  return palette[hash % palette.length];
}

export function Avatar({ name, isOnline, size = "md" }: Props) {
  const color = pickFlatColor(name);
  return (
    <div className={`${styles.avatar} ${styles[size]}`} style={{ background: color }} aria-label={name} role="img">
      <span className={styles.text}>{initials(name)}</span>
      {typeof isOnline === "boolean" && (
        <span className={`${styles.presence} ${isOnline ? styles.on : styles.off}`} aria-hidden />
      )}
    </div>
  );
}
