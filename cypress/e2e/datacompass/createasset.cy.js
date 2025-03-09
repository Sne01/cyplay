import constants from '../../support/constants';
import env from '../../support/env';
import locators from "../../support/locators";

describe('Data Compass Asset Creation', () => {
  let context;

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
    
       
  });

  it('should create a new asset', () => {
    // cy.visit('https://data-compass.auriga.privyone.com/assets/');
    cy.get('[href="/assets/"] > .menu_title > .content-logo').click()
    cy.wait(1000)
    cy.get('.purpose-index-button.text-sm').click();
    cy.wait(1000);
    cy.get('#service_label_0').click()
    cy.wait(1000)
    cy.get('.btn-primary').click()
    cy.get('#submit_metadata_domain_id').select('default')
    cy.get('#submit_metadata_sub_domain_id').select('default')
    cy.get('#submit_metadata_environment_id').select('staging')
    cy.get('#submit_metadata_name').type('automationpostgres11')
    cy.get('#submit_metadata_display_name').type('automationtesting')
    cy.get('#submit_metadata_description').type('This is postgres database.') 
    cy.get('.btn-primary').click()
    cy.get('#submit_connection_details_database').type('addressify-staging')
    cy.get('#submit_connection_details_host').type('10.140.224.230')
    cy.get('#submit_connection_details_port').type('5432')
    cy.get('#submit_connection_details_username').type('addressify-app')
    cy.get('#submit_connection_details_password').type('r00t.123')
    cy.get('#test-connection-button').click()
    cy.wait(5000)
    cy.get('#close-modal-btn').click()
    cy.wait(1000)
    cy.get('[type="submit"]').click()
 });
});