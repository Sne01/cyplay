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
    cy.get('#assets-c40deefe-cbc2-4b0d-8fdb-6fddfc27d04a').click()
    cy.get('[data-phx-id="m16-phx-GCmZ3WJ9Ns9Mgr7x').click()
 });
});