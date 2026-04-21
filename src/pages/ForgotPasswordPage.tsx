import { useState } from "react";
import styles from "./AuthPages.module.scss";

type Props = {
  onGoLogin: () => void;
};

export function ForgotPasswordPage({ onGoLogin }: Props) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function submit() {
    if (!email.trim().includes("@")) return;
    setSent(true);
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.title}>Recuperar senha</div>
          <div className={styles.subtitle}>Vamos te enviar um link</div>
        </div>

        <form
          className={styles.body}
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <div className={styles.field}>
            <label className={styles.label} htmlFor="recover-email">
              E-mail
            </label>
            <input
              id="recover-email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              autoComplete="email"
              inputMode="email"
            />
          </div>

          <div className={styles.actions}>
            <button className={styles.primary} type="submit">
              Enviar link
            </button>
            {sent ? (
              <div className={styles.hint}>Se este e-mail existir, você receberá instruções em instantes.</div>
            ) : (
              <div className={styles.hint}>Front-end apenas: envio simulado.</div>
            )}
          </div>

          <div className={styles.links}>
            <button className={styles.linkBtn} type="button" onClick={onGoLogin}>
              Voltar para login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

