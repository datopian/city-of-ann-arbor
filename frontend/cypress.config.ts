import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    CKAN_URL: "http://ckan-dev:5000",
    CKAN_SYSADMIN_API_KEY: "",
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
