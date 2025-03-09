// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import 'cypress-mochawesome-reporter/register';
import '../e2e/commands';
import '../e2e/tasky_with_only_cypress/tasky_commands';
import './env';
import './gchat_reports/gchat_report';
import 'cypress-shadow-dom';

// Alternatively you can use CommonJS syntax:
require('cypress-xpath')
require("cypress-plugin-tab")
require('cypress-iframe')
require('cypress-downloadfile/lib/downloadFileCommand')