const { defineConfig } = require('cypress');
module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 800,
  video: false,
  screenshotOnRunFailure: true,
  retries: 0,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'reports/html',
    reportFilename: 'index',
    reportTitle: 'TCC — Automation Exercise',
    charts: true,
    saveJson: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: true
  },
  e2e: {
    baseUrl: 'https://automationexercise.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    defaultCommandTimeout: 10000,
    testIsolation: true,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    }
  }
});
