// chromium picks the linux keyring from XDG_CURRENT_DESKTOP (kwallet on kde,
// libsecret on gnome, a hardcoded key elsewhere), so a session encrypted under
// one desktop can't be decrypted under another. pin one backend instead.
// every secret service provider (gnome-keyring, kwallet 5.97+, keepassxc) serves libsecret.
export const PINNED_PASSWORD_STORE = "gnome-libsecret";

export function pinnedPasswordStore(
  platform: NodeJS.Platform,
  hasSwitch: (name: string) => boolean,
): string | null {
  if (platform !== "linux") return null;
  // an explicit --password-store from the user always wins
  if (hasSwitch("password-store")) return null;
  return PINNED_PASSWORD_STORE;
}
