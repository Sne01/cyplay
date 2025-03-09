import constants from "../../support/constants";
import env from "../../support/env";
import locators from "../../support/locators";


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
          
    })

  it('configures multiple database services', () => {
      cy.fixture('dbconfig.json').then((configs) => {
          
         // configs.connectors.dbname = postgres
          configs.connectors.forEach((dbname) => {
              const dbConfig = {
                  locators: configs.locators,
                  data: dbname.serviceConfig,
                  connectionDetails: dbname.connectionDetails
              };
              cy.createDataCompassAsset01(dbConfig);
          });
      });
  });
});
