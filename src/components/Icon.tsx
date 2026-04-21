type IconName =
  | "menu"
  | "chevronDown"
  | "search"
  | "more"
  | "home"
  | "heart"
  | "chat"
  | "user"
  | "plus"
  | "send"
  | "mic"
  | "back";

type Props = {
  name: IconName;
  size?: number;
  className?: string;
  title?: string;
};

export function Icon({ name, size = 22, className, title }: Props) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", className, role: "img" as const };
  const ariaProps = title ? { "aria-label": title } : { "aria-hidden": true as const };

  switch (name) {
    case "menu":
      return (
        <svg {...common} {...ariaProps} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
    case "chevronDown":
      return (
        <svg {...common} {...ariaProps} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M7 10l5 5 5-5" />
        </svg>
      );
    case "search":
      return (
        <svg {...common} {...ariaProps} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      );
    case "more":
      return (
        <svg {...common} {...ariaProps} fill="currentColor">
          <circle cx="12" cy="5" r="1.6" />
          <circle cx="12" cy="12" r="1.6" />
          <circle cx="12" cy="19" r="1.6" />
        </svg>
      );
    case "home":
      return (
        <svg {...common} {...ariaProps} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
          <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-10.5Z" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common} {...ariaProps} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
          <path d="M12 21s-7-4.8-9.4-9C.5 7.8 3.2 4 7.1 4c2 0 3.5 1.1 4.9 2.8C13.5 5.1 15 4 16.9 4c3.9 0 6.6 3.8 4.5 8-2.4 4.2-9.4 9-9.4 9Z" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common} {...ariaProps} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
          <path d="M21 14a4 4 0 0 1-4 4H8l-5 3V6a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" />
        </svg>
      );
    case "user":
      return (
        <svg {...common} {...ariaProps} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
          <path d="M20 21a8 8 0 1 0-16 0" />
          <path d="M12 13a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
        </svg>
      );
    case "plus":
      return (
        <svg {...common} {...ariaProps} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "send":
      return (
        <svg {...common} {...ariaProps} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
          <path d="M22 2 11 13" />
          <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
        </svg>
      );
    case "mic":
      return (
        <svg {...common} {...ariaProps} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
          <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3Z" />
          <path d="M19 11a7 7 0 0 1-14 0" />
          <path d="M12 18v4" />
        </svg>
      );
    case "back":
      return (
        <svg {...common} {...ariaProps} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      );
  }
}

