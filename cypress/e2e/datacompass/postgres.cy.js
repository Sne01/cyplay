import constants from "../../support/constants";
import env from "../../support/env";
import locators, { postgres } from "../../support/locators";

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
        //cy.get('[href="/assets/"] > .menu_title > .content-logo').click()
        //cy.xpath("//span[normalize-space()='Assets']").click()
        cy.xpath(locators.asset).click()
        cy.wait(1000)
        // Start asset creation
        //cy.get('.purpose-index-button.text-sm').click()
        cy.xpath(locators.create_asset).click()
        // cy.wait(1000)
        
      });
      
      it('should create a new asset for postgres' , () => {

        cy.xpath(locators.postgres).click()
        cy.xpath(locators.saveNcontinue).click()

        cy.fillConfigurationService(postgres)
        cy.xpath("//input[@id='submit_connection_details_database']").type("")
        cy.xpath("//input[@id='submit_connection_details_host']").type("")
        cy.xpath("//input[@id='submit_connection_details_port']").type("5432")
        cy.xpath("//input[@id='submit_connection_details_username']").type("addresify-app")
      })



    })
