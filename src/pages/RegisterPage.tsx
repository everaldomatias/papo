import { useState } from "react";
import styles from "./AuthPages.module.scss";
import type { LoggedUser } from "../types/auth";

type Props = {
  onRegister: (user: LoggedUser) => void;
  onGoLogin: () => void;
};

export function RegisterPage({ onRegister, onGoLogin }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const canSubmit =
    name.trim().length >= 2 && email.trim().includes("@") && password.trim().length >= 6 && password === confirm;

  function submit() {
    if (!canSubmit) return;
    onRegister({ id: crypto.randomUUID(), name: name.trim(), email: email.trim() });
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.title}>Criar conta</div>
          <div className={styles.subtitle}>Comece a conversar</div>
        </div>

        <form
          className={styles.body}
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <div className={styles.field}>
            <label className={styles.label} htmlFor="name">
              Nome
            </label>
            <input
              id="name"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              autoComplete="name"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              autoComplete="email"
              inputMode="email"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="new-password">
              Senha
            </label>
            <input
              id="new-password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              type="password"
              autoComplete="new-password"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="confirm-password">
              Confirmar senha
            </label>
            <input
              id="confirm-password"
              className={styles.input}
              value={confirm}
              onChange={(e) => setConfirm(e.currentTarget.value)}
              type="password"
              autoComplete="new-password"
            />
          </div>

          <div className={styles.links}>
            <button className={styles.linkBtn} type="button" onClick={onGoLogin}>
              Já tenho conta
            </button>
          </div>

          <div className={styles.actions}>
            <button className={styles.primary} type="submit" disabled={!canSubmit}>
              Criar conta
            </button>
            <div className={styles.hint}>Senha mínima sugerida: 6 caracteres (validação só de UI).</div>
          </div>
        </form>
      </div>
    </div>
  );
}

