import { describe, expect, it } from "vitest";
import { PINNED_PASSWORD_STORE, pinnedPasswordStore } from "./password-store";

describe("pinnedPasswordStore", () => {
  it("pins libsecret on linux so every desktop uses the same key", () => {
    expect(pinnedPasswordStore("linux", () => false)).toBe(
      PINNED_PASSWORD_STORE,
    );
    expect(PINNED_PASSWORD_STORE).toBe("gnome-libsecret");
  });

  it("keeps a --password-store the user passed", () => {
    expect(
      pinnedPasswordStore("linux", (name) => name === "password-store"),
    ).toBeNull();
  });

  it("leaves other platforms alone", () => {
    expect(pinnedPasswordStore("win32", () => false)).toBeNull();
    expect(pinnedPasswordStore("darwin", () => false)).toBeNull();
  });
});
