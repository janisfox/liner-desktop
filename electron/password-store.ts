export const PINNED_PASSWORD_STORE = "gnome-libsecret";

export function pinnedPasswordStore(
  platform: NodeJS.Platform,
  hasSwitch: (name: string) => boolean,
): string | null {
  if (platform !== "linux") return null;
  if (hasSwitch("password-store")) return null;
  return PINNED_PASSWORD_STORE;
}
