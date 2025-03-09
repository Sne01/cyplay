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
    cy.get('[href="/assets/"] > .menu_title > .content-logo').click()
    cy.wait(1000)
    // Start asset creation
    cy.get('.purpose-index-button.text-sm').click()
    // cy.wait(1000)
    
  });

  it('should create a new asset for postgres', () => {
    const assetDetails = {
      domain: 'default',
      subDomain: 'default',
      environment: 'staging',
      name: 'automationpostgres11',
      displayName: 'automationtesting',
      description: 'This is postgres database.',
      database: 'addressify-staging',
      host: '10.140.224.230',
      port: '5432',
      username: 'addressify-app',
      password: 'r00t.123'
    };

    cy.createDataCompassAsset(assetDetails);
  });
});