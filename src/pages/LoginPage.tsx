import { useState } from "react";
import styles from "./AuthPages.module.scss";
import type { LoggedUser } from "../types/auth";

type Props = {
  onLogin: (user: LoggedUser) => void;
  onGoRegister: () => void;
  onGoForgotPassword: () => void;
};

export function LoginPage({ onLogin, onGoRegister, onGoForgotPassword }: Props) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  function submit() {
    const id = identifier.trim();
    if (!id || !password.trim()) return;
    const isEmail = id.includes("@");
    onLogin({
      id: crypto.randomUUID(),
      name: isEmail ? id.split("@")[0] ?? "Usuário" : id,
      email: isEmail ? id : undefined,
      username: isEmail ? undefined : id,
    });
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.title}>Entrar</div>
          <div className={styles.subtitle}>Acesse suas conversas</div>
        </div>

        <form
          className={styles.body}
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <div className={styles.field}>
            <label className={styles.label} htmlFor="identifier">
              Nome de usuário ou e-mail
            </label>
            <input
              id="identifier"
              className={styles.input}
              value={identifier}
              onChange={(e) => setIdentifier(e.currentTarget.value)}
              autoComplete="username"
              inputMode="email"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              type="password"
              autoComplete="current-password"
            />
          </div>

          <div className={styles.links}>
            <button className={styles.linkBtn} type="button" onClick={onGoForgotPassword}>
              Recuperar senha
            </button>
            <button className={styles.linkBtn} type="button" onClick={onGoRegister}>
              Criar conta
            </button>
          </div>

          <div className={styles.actions}>
            <button className={styles.primary} type="submit">
              Entrar
            </button>
            <div className={styles.hint}>Front-end apenas: login simulado para validar layout/fluxos.</div>
          </div>
        </form>
      </div>
    </div>
  );
}

