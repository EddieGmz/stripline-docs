/** Three fader caps, as in the console and the bridge. */
export function Logo() {
  return (
    <svg width="22" height="20" viewBox="0 0 22 20" aria-hidden="true" className="shrink-0">
      <rect x="2" y="0" width="2" height="20" rx="1" fill="var(--muted-foreground)" />
      <rect x="0" y="11" width="6" height="4" rx="1.5" fill="#c08a2a" />
      <rect x="10" y="0" width="2" height="20" rx="1" fill="var(--muted-foreground)" />
      <rect x="8" y="4" width="6" height="4" rx="1.5" fill="var(--primary)" />
      <rect x="18" y="0" width="2" height="20" rx="1" fill="var(--muted-foreground)" />
      <rect x="16" y="8" width="6" height="4" rx="1.5" fill="#4f8a5a" />
    </svg>
  );
}
