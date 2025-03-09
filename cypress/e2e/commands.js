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

import constants from "../support/constants";
import locators from "../support/locators";
import 'cypress-wait-until';
const util = require('util');

/**
 * Common login function
 * @param {*} login_type => string (dashboard/agent)
 * @param {*} context => cyprees context
 */
Cypress.Commands.add('login', (user, login_type, context) => {
    cy.visit(context.client_data[login_type]);
    cy.xpath(locators.username).type(context.creds[user].email);
    cy.xpath(locators.password).type(context.creds[user].password);
    cy.xpath(locators.login_button).click();
    cy.wait(1000)
    cy.reload();
    cy.wait(1000)
});

Cypress.Commands.add('loginDC', (user, login_type, context) => {
    //email
    cy.visit("https://data-compass.auriga.privyone.com/");
    cy.get(locators.shadowroot_email)
    .shadow()
    .find(locators.shadowroot_email2)
    .shadow()
    .find(locators.email)
    .type(context.creds[user].email); 
    cy.wait(1000)
    // login button
    cy.get(locators.shadowroot_login_button)
    .shadow()
    .find(locators.shadowroot_login_button1)
    .shadow()
    .find(locators.login_button)
    .click();
    cy.wait(1000)
    // password
    cy.get(locators.shadowroot_password)
    .shadow()
    .find(locators.shadowroot_password1)
    .shadow()
    .find(locators.password)
    .type(context.creds[user].password); 
 
    // continue button
    cy.get(locators.shadowroot_continue_button)
    .shadow()
    .find(locators.shadowroot_continue_button1)
    .shadow()
    .find(locators.continue_button)
    .click();
    
});


//For asset creation 
Cypress.Commands.add('createDataCompassAsset', (assetDetails) => {

    // Select service
    cy.get('#service_label_0').click()
    cy.wait(1000)
    cy.get('.btn-primary').click()
    
    // Fill metadata
    cy.get('#submit_metadata_domain_id').select(assetDetails.domain || 'default')
    cy.get('#submit_metadata_sub_domain_id').select(assetDetails.subDomain || 'default')
    cy.get('#submit_metadata_environment_id').select(assetDetails.environment || 'staging')
    cy.get('#submit_metadata_name').type(assetDetails.name)
    cy.get('#submit_metadata_display_name').type(assetDetails.displayName)
    cy.get('#submit_metadata_description').type(assetDetails.description)
    cy.get('.btn-primary').click()
    
    // Fill connection details
    cy.get('#submit_connection_details_database').type(assetDetails.database)
    cy.get('#submit_connection_details_host').type(assetDetails.host)
    cy.get('#submit_connection_details_port').type(assetDetails.port)
    cy.get('#submit_connection_details_username').type(assetDetails.username)
    cy.get('#submit_connection_details_password').type(assetDetails.password)
    cy.get('#submit_connection_details_account').type(assetDetails.account)
    // cy.get().type(assetDetails.role)
    // cy.get
    // Test connection and submit
    cy.get('#test-connection-button').click()
    cy.wait(5000)
    cy.get('#close-modal-btn').click()
    cy.wait(1000)
    cy.get('[type="submit"]').click()
  })




  // cypress/support/commands.js
Cypress.Commands.add('createDataCompassAsset1', (assetDetails) => {
    // Select service
    cy.get(assetDetails.locators.serviceLabel).click();
    cy.wait(1000);
    cy.get(assetDetails.locators.primaryButton).click();
    
    // Fill metadata
    cy.get(assetDetails.locators.domain).select(assetDetails.data.domain);
    cy.get(assetDetails.locators.subDomain).select(assetDetails.data.subDomain);
    cy.get(assetDetails.locators.environment).select(assetDetails.data.environment);
    cy.get(assetDetails.locators.name).type(assetDetails.data.name);
    cy.get(assetDetails.locators.displayName).type(assetDetails.data.displayName);
    cy.get(assetDetails.locators.description).type(assetDetails.data.description);
    cy.get(assetDetails.locators.primaryButton).click();
    
    // Fill connection details
    cy.get(assetDetails.locators.database).type(assetDetails.connectionDetails.database);
    cy.get(assetDetails.locators.host).type(assetDetails.connectionDetails.host);
    cy.get(assetDetails.locators.port).type(assetDetails.connectionDetails.port);
    cy.get(assetDetails.locators.username).type(assetDetails.connectionDetails.username);
    cy.get(assetDetails.locators.password).type(assetDetails.connectionDetails.password);
    //cy.get(assetDetails.locators.account).type(assetDetails.connectionDetails.account);
    
    // Test connection and submit
    cy.get(assetDetails.locators.testConnection).click();
    cy.wait(2000);
    cy.get(assetDetails.locators.closeModal).click();
    cy.wait(1000);
    cy.get(assetDetails.locators.submitButton).click();
});



import { databaseFieldMappings } from '../../cypress/support/databasemapping.js';

Cypress.Commands.add('selectDatabaseAndFillCredentials', (databaseType) => {
  // Validate the database type
  const validDatabaseTypes = Object.keys(databaseFieldMappings);
  
  if (!validDatabaseTypes.includes(databaseType)) {
    throw new Error(`Invalid database type: ${databaseType}`);
  }

  // Select the database type from UI dropdown
  cy.get('#service_label_0').click();
  cy.get('.btn-primary').click();
  
  // Wait for UI to update dynamically based on selected database
  cy.wait(1000); // Adjust wait time or use a better approach like `cy.intercept()`

  // Load credentials from JSON file
  cy.fixture('databaseconfigurations.json').then((serviceConfig) => {
    const dbCredentials = serviceConfig[databaseType];
    const fieldMapping = databaseFieldMappings[databaseType];

    
    
    // Wait for dynamic fields to load (Adjust this based on how UI updates)
    cy.wait(2000);

    // Fill required fields
    fieldMapping.requiredFields.forEach((field) => {
      cy.get(`[data-testid="${field}"]`).should('be.visible').then(($input) => {
        if (dbCredentials[field]) {
          cy.wrap($input).clear().type(dbCredentials[field]);
          cy.wrap($input).should('have.value', dbCredentials[field]);
        } else {
          throw new Error(`Missing required field: ${field} for ${databaseType}`);
        }
      });
    });

    // // Fill optional fields if they exist and are visible
    
  });

  // Test connection
  cy.get('#test-connection-button').click();
  cy.wait(2000); // Ensure connection check completes
  cy.get('#close-modal-btn').click();

  // Submit the form
  cy.get('[type="submit"]').click();
});



/**
 * Common login function
 * @param {*} login_type => string (dashboard/agent)
 */
Cypress.Commands.add('logout', (login_type) => {
    if (login_type == constants.dashboard) {
        cy.xpath(locators.logout_menu_button).click();
        cy.xpath(locators.logout_button).click();
        expect(cy.xpath(locators.login_button)).not.toBeVisible();
    } else if (login_type == constants.tasky) {
        cy.wait(2000);
        cy.xpath(util.format(locators.tasky_tabs, "Sign Out")).click();
        cy.wait(3000);
        cy.xpath((locators.tasky_signed_out_successfully), { timeout: 2_000 }).should('be.visible');
    } else {
        cy.xpath(locators.logout_menu_button).click();
        cy.xpath(locators.logout_button).click();
        expect(cy.xpath(locators.logout_button)).not.toBeVisible();
    }
});

/**
* array of text from xpaths
* @param {*} xpaths => list of xpaths
*/
Cypress.Commands.add('get_text_using_xpath', (xpaths) => {
    cy.xpath("(" + xpaths + ")[1]", { timeout: 2_000 }).should('be.visible');
    var array = new Array();
    cy.xpath(xpaths).then(elements => {
        for (var element of elements) {
            array.push((element.innerText).trim());
        }
    })
    return cy.wrap(array);
});

Cypress.Commands.add('parse_xlsx', (input_file) => {
    cy.log(input_file);
    return cy.task('parse_xlsx', { file_path: input_file });
});

/**
* wait for test for specified timeout with interval to check
* @param {*} xpath => xpath of element
* @param {*} text => text of element
* @argument {*} errorMsg => custom error message to display if element is not found, // overrides the default error message
* @argument {*} timeout => maximum timeout, default to 5000ms
* @argument {*} interval => interval to check element, default to 200ms
*/
Cypress.Commands.add("wait_for_text_to_be_visible", (xpath, text) => {
    cy.waitUntil(() => cy.xpath(xpath).then(msg => msg.text() === text), {
        errorMsg: "Timeout exceeded 60000ms while locating [" + xpath + "]",
        timeout: 60000,
        interval: 2000
    });
});

var server_token = "ce5ec25e-98ad-4293-b2d4-8470aaf5efe5";

Cypress.Commands.add('get_message_id', (email_id, subject) => {
    var message_id = null;
    cy.request({
        method: 'GET',
        url: 'https://api.postmarkapp.com/messages/inbound',
        headers: {
            'X-Postmark-Server-Token': server_token,
            'content-type': 'application/json',
            'Accept': 'application/json',
        },
        qs: {
            mailboxID: email_id,
            count: 1,
            offset: 0
        }
    }).then((response) => {
        var mails = response.body.InboundMessages;
        mails.every(mail => {
            if (mail.OriginalRecipient === email_id && mail.Subject === subject) {
                cy.log("Message ID: " + mail.MessageID)
                message_id = mail.MessageID;
                return false;
            }
            return true;
        });
    });
    cy.then(() => {
        return cy.wrap(message_id)
    });
});

Cypress.Commands.add('get_url_link', (message_id, partial_link_text) => {
    var link_url = null;
    cy.request({
        method: 'GET',
        url: `https://api.postmarkapp.com/messages/inbound/${message_id}`,
        headers: {
            'X-Postmark-Server-Token': server_token,
            'content-type': 'application/json',
            'Accept': 'application/json',
        }
    }).then((response) => {
        var mail_contents = JSON.stringify(response.body.HtmlBody).split("\\n");
        mail_contents.every(mail_content => {
            if (mail_content != "" && mail_content.includes(partial_link_text)) {
                var anchor_tag = mail_content.trim().split(" ");
                anchor_tag.every(element => {
                    if (element.includes("href=") && element != "") {
                        //add your own logic here
                        link_url = element.replace("href=", "").trim();
                        return false
                    }
                    return true;
                })
                cy.log("Link: " + link_url);
                return false;
            }
            return true;
        })
    });
    cy.then(() => {
        return cy.wrap(link_url)
    });
});



Cypress.Commands.add('createDataCompassAsset01', (assetDetails) => {
    // Select service
    cy.get(assetDetails.locators.serviceLabel).click();
    cy.wait(1000);
    cy.get(assetDetails.locators.primaryButton).click();
    
    // Fill metadata
    cy.get(assetDetails.locators.domain).select(assetDetails.data.domain);
    cy.get(assetDetails.locators.subDomain).select(assetDetails.data.subDomain);
    cy.get(assetDetails.locators.environment).select(assetDetails.data.environment);
    cy.get(assetDetails.locators.name).type(assetDetails.data.name);
    cy.get(assetDetails.locators.displayName).type(assetDetails.data.displayName);
    cy.get(assetDetails.locators.description).type(assetDetails.data.description);
    cy.get(assetDetails.locators.primaryButton).click();
    
    // Fill connection details dynamically
    if (assetDetails.connectionDetails.database) {
        cy.get(assetDetails.locators.database).type(assetDetails.connectionDetails.database);
    }
    if (assetDetails.connectionDetails.host) {
        cy.get(assetDetails.locators.host).type(assetDetails.connectionDetails.host);
    }
    if (assetDetails.connectionDetails.port) {
        cy.get(assetDetails.locators.port).type(assetDetails.connectionDetails.port);
    }
    if (assetDetails.connectionDetails.username) {
        cy.get(assetDetails.locators.username).type(assetDetails.connectionDetails.username);
    }
    if (assetDetails.connectionDetails.password) {
        cy.get(assetDetails.locators.password).type(assetDetails.connectionDetails.password);
    }

    // Test connection and submit
    cy.get(assetDetails.locators.testConnection).click();
    cy.wait(2000);
    cy.get(assetDetails.locators.closeModal).click();
    cy.wait(1000);
    cy.get(assetDetails.locators.submitButton).click();
});


Cypress.Commands.add('fillConfigurationService',(configDetails) => {

    cy.xpath(configDetails.locators.domain).select(configDetails.constants.domain)
    cy.xpath(configDetails.locators.sub_domain).select(configDetails.constants.sub_domain)
    cy.xpath(configDetails.locators.environment).select(configDetails.constants.environment)
    //randon text function.......
    cy.xpath(configDetails.locators.service_name).type("QA_Automation")
    cy.xpath(configDetails.locators.label).type(configDetails.constants.label)
    cy.xpath(configDetails.locators.service_details).type(configDetails.constants.service_details)
    cy.xpath(configDetails.locators.saveNcontinue).click()
})

//final command for asset page navigation 

Cypress.Commands.add('navigateToServiceCreation', (serviceType) => {
    // Navigate to assets page
    cy.xpath(locators.assetCreation.assetsMenu).click()
    cy.wait(1000)
    
    // Click create new button 
    cy.xpath(locators.assetCreation.createNewBtn).click()
    cy.wait(1000)
    
    // Select the database type using XPath
    cy.xpath(util.format(locators.assetCreation.serviceTypeSelector, serviceType)).click()
    cy.wait(1000)
    
    // Click the primary button to proceed
    cy.xpath(locators.assetCreation.primaryBtn).click()
});

//final command for page 1

Cypress.Commands.add('configureServiceMetadata', (serviceMetadata) => {
  cy.xpath(locators.serviceConfig.domain).select(serviceMetadata.domain)
  cy.xpath(locators.serviceConfig.subDomain).select(serviceMetadata.subDomain)
  cy.xpath(locators.serviceConfig.environment).select(serviceMetadata.environment)
  cy.xpath(locators.serviceConfig.serviceName).type(serviceMetadata.serviceName)
  cy.xpath(locators.serviceConfig.label).type(serviceMetadata.label)
  cy.xpath(locators.serviceConfig.serviceDetails).type(serviceMetadata.serviceDetails)
  cy.xpath(locators.serviceConfig.submitBtn).click()
});

//test connection final command

Cypress.Commands.add('handleTestConnection', () => {
    cy.xpath(locators.dbConnection.testConnection).click()
    cy.wait(5000)
    cy.xpath(locators.dbConnection.closeModal).click()
    cy.wait(1000)
    cy.xpath(locators.serviceConfig.submitBtn).click()
  });