import constants from "../../support/constants";
import env from "../../support/env";
import locators from "../../support/locators";

// cypress/integration/database_config_test.js
describe('Database Configuration Test', () => {
    before(() => {
        context = env.context();
        cy.log(context);
      });
    
      Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
      });
    
      beforeEach(() => {
        // Login 
        cy.visit('https://data-compass.auriga.privyone.com/');
        cy.loginDC(constants.login002, constants.datacompass, context);
        cy.get('[href="/assets/"] > .menu_title > .content-logo').click()
        cy.wait(1000)
        // Start asset creation
        cy.get('.purpose-index-button.text-sm').click()
        // cy.wait(1000)
        
      });

    it('configures postgres database service', () => {
        cy.fixture('databaseconfigurations.json').then((configs) => {
            const postgresConfig = {
                locators: configs.locators,
                data: configs.postgres.serviceConfig,
                connectionDetails: configs.postgres.connectionDetails
            };
            cy.createDataCompassAsset1(postgresConfig);
        });
    });
});