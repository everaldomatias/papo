import { useMemo, useState } from "react";
import styles from "./App.module.scss";
import { ConversationsPanel } from "./features/conversations/ConversationsPanel";
import { ChatPanel } from "./features/chat/ChatPanel";
import { mockConversations, mockMessagesByConversationId } from "./data/mockChat";
import type { ConversationId, Message } from "./types/chat";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import type { LoggedUser } from "./types/auth";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { ProfilePage } from "./pages/ProfilePage";
import { MenuDrawer, type MenuItem } from "./components/MenuDrawer";

export function App() {
  const isNarrow = useMediaQuery("(max-width: 900px)");
  const [route, setRoute] = useState<"chat" | "profile" | "login" | "register" | "forgot-password">("login");
  const [user, setUser] = useLocalStorageState<LoggedUser | null>("auth.user", null);

  const [activeConversationId, setActiveConversationId] = useState<ConversationId>(
    mockConversations[0]?.id ?? "c1"
  );
  const [mobileScreen, setMobileScreen] = useState<"list" | "chat">("list");
  const [messagesByConversationId, setMessagesByConversationId] = useState(
    mockMessagesByConversationId
  );
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const isAuthed = Boolean(user);

  const activeConversation = useMemo(
    () => mockConversations.find((c) => c.id === activeConversationId) ?? mockConversations[0],
    [activeConversationId]
  );

  const activeMessages: readonly Message[] =
    (activeConversation && messagesByConversationId[activeConversation.id]) ?? [];

  function handleSelectConversation(id: ConversationId) {
    setActiveConversationId(id);
    setMobileScreen("chat");
  }

  function handleSend(text: string) {
    if (!activeConversation) return;
    const trimmed = text.trim();
    if (!trimmed) return;

    const now = new Date();
    const newMessage: Message = {
      id: crypto.randomUUID(),
      conversationId: activeConversation.id,
      author: "me",
      text: trimmed,
      createdAt: now.toISOString(),
    };

    setMessagesByConversationId((prev) => ({
      ...prev,
      [activeConversation.id]: [...(prev[activeConversation.id] ?? []), newMessage],
    }));
  }

  function handleLogin(nextUser: LoggedUser) {
    setUser(nextUser);
    setRoute("chat");
  }

  function handleLogout() {
    setUser(null);
    setRoute("login");
  }

  function navigateAuthed(to: "chat" | "profile") {
    setRoute(to);
    if (to === "chat") setMobileScreen("list");
  }

  const menuItems: readonly MenuItem[] = [
    { key: "chat", label: "Conversas", onClick: () => navigateAuthed("chat") },
    { key: "profile", label: "Perfil", onClick: () => navigateAuthed("profile") },
    { key: "logout", label: "Sair", onClick: handleLogout },
  ];

  const showList = !isNarrow || mobileScreen === "list";
  const showChat = !isNarrow || mobileScreen === "chat";

  if (!isAuthed) {
    if (route === "register") {
      return <RegisterPage onRegister={handleLogin} onGoLogin={() => setRoute("login")} />;
    }
    if (route === "forgot-password") {
      return <ForgotPasswordPage onGoLogin={() => setRoute("login")} />;
    }
    return (
      <LoginPage
        onLogin={handleLogin}
        onGoRegister={() => setRoute("register")}
        onGoForgotPassword={() => setRoute("forgot-password")}
      />
    );
  }

  if (route === "profile") {
    return (
      <>
        <ProfilePage user={user!} onUpdateUser={setUser} onOpenMenu={() => setMenuOpen(true)} />
        <MenuDrawer open={menuOpen} title="Conta" items={menuItems} onClose={() => setMenuOpen(false)} />
      </>
    );
  }

  return (
    <>
      <div className={styles.page}>
        <div className={styles.shell}>
          {showList && (
            <ConversationsPanel
              activeConversationId={activeConversationId}
              conversations={mockConversations}
              search={search}
              onSearchChange={setSearch}
              onSelectConversation={handleSelectConversation}
              onOpenMenu={() => setMenuOpen(true)}
            />
          )}

          {showChat && activeConversation && (
            <ChatPanel
              conversation={activeConversation}
              messages={activeMessages}
              isNarrow={isNarrow}
              onBack={() => setMobileScreen("list")}
              onSend={handleSend}
              onOpenMenu={() => setMenuOpen(true)}
            />
          )}
        </div>
      </div>
      <MenuDrawer open={menuOpen} title="Conta" items={menuItems} onClose={() => setMenuOpen(false)} />
    </>
  );
}
