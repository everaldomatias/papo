import { useEffect, useMemo, useState } from "react";
import styles from "./ProfilePage.module.scss";
import type { LoggedUser } from "../types/auth";
import { Avatar } from "../components/Avatar";

type Props = {
  user: LoggedUser;
  onUpdateUser: (user: LoggedUser) => void;
  onOpenMenu: () => void;
};

export function ProfilePage({ user, onUpdateUser, onOpenMenu }: Props) {
  const initial = useMemo(
    () => ({ name: user.name ?? "", email: user.email ?? "", username: user.username ?? "" }),
    [user.email, user.name, user.username]
  );
  const [form, setForm] = useState(initial);

  useEffect(() => setForm(initial), [initial]);

  const canSave = form.name.trim().length >= 2;

  function save() {
    if (!canSave) return;
    onUpdateUser({
      ...user,
      name: form.name.trim(),
      email: form.email.trim() || undefined,
      username: form.username.trim() || undefined,
    });
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.title}>Perfil</div>
          <button className={styles.logout} type="button" onClick={onOpenMenu}>
            Menu
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.row}>
            <Avatar name={user.name ?? "Usuário"} size="lg" />
            <div className={styles.meta}>
              <div className={styles.name}>{user.name}</div>
              <div className={styles.sub}>{user.email ?? user.username ?? "—"}</div>
            </div>
          </div>

          <div className={styles.grid}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="profile-name">
                Nome
              </label>
              <input
                id="profile-name"
                className={styles.input}
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.currentTarget.value }))}
                autoComplete="name"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="profile-email">
                E-mail
              </label>
              <input
                id="profile-email"
                className={styles.input}
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.currentTarget.value }))}
                autoComplete="email"
                inputMode="email"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="profile-username">
                Usuário
              </label>
              <input
                id="profile-username"
                className={styles.input}
                value={form.username}
                onChange={(e) => setForm((p) => ({ ...p, username: e.currentTarget.value }))}
                autoComplete="username"
              />
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.primary} type="button" onClick={save} disabled={!canSave}>
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
