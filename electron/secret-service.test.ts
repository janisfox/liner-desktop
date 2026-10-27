import { describe, expect, it } from "vitest";
import { hasSecretService, listsSecretService } from "./secret-service";

const reply = (...names: string[]) =>
  `method return time=1 sender=org.freedesktop.DBus\n   array [\n${names
    .map((name) => `      string "${name}"`)
    .join("\n")}\n   ]\n`;

describe("listsSecretService", () => {
  it("finds the secret service among the bus names", () => {
    expect(
      listsSecretService(
        reply("org.freedesktop.DBus", "org.freedesktop.secrets"),
      ),
    ).toBe(true);
  });

  it("ignores names that only start with the secret service name", () => {
    expect(listsSecretService(reply("org.freedesktop.secrets.extra"))).toBe(
      false,
    );
  });
});

describe("hasSecretService", () => {
  it("accepts a running provider", () => {
    expect(
      hasSecretService((method) =>
        method === "ListNames" ? reply("org.freedesktop.secrets") : reply(),
      ),
    ).toBe(true);
  });

  it("accepts a provider the bus can activate", () => {
    expect(
      hasSecretService((method) =>
        method === "ListActivatableNames"
          ? reply("org.freedesktop.secrets")
          : reply(),
      ),
    ).toBe(true);
  });

  it("rejects a bus without a provider", () => {
    expect(hasSecretService(() => reply("org.freedesktop.DBus"))).toBe(false);
  });

  it("rejects when the session bus can't be queried", () => {
    expect(hasSecretService(() => null)).toBe(false);
  });
});
