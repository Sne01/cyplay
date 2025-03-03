// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import constants from "../../support/constants";
import locators from "../../support/locators";
const util = require('util');

/**
 * Navigate to Page
 * @param {*} select_list => string (Name of the list e.g. 'Review pending')
 * @param {*} page => current page
 */
Cypress.Commands.add('navigate_to_page', (select_list) => {
    cy.xpath(locators.logout_menu_button).click();
    cy.xpath(util.format(locators.tasky_menu_list, select_list)).click();
});

/**
 * Function to switch between tasky tabs
 * @param {*} tab => string (My Tasks/Manage Tasks/Realtime Tasks)
 * @param {*} page => current page
 */
Cypress.Commands.add('switch_tasky_tabs', (tab) => {
    cy.wait(2000);
    cy.xpath(util.format(locators.tasky_tabs, tab), { timeout: 4_000 }).should('be.visible');
    cy.xpath(util.format(locators.tasky_tabs, tab)).click();
});





