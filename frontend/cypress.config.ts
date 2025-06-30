import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    CKAN_URL: "https://ckan.ann-arbor.dev.datopian.com",
    CKAN_SYSADMIN_API_KEY: "",
  },
  e2e: {
    chromeWebSecurity: false,
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
