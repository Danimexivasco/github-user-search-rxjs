import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    setupFiles:  ["./tests/integration/setup.ts"],
    globals:     true
  }
});
