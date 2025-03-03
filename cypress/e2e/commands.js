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
    cy.visit(context.client_data[login_type]);
    cy.xpath(locators.email).type(context.creds[user].email);
    cy.xpath(locators.login_button).click();
    cy.xpath(locators.password).type(context.creds[user].password);
    cy.xpath(locators.continue_button).click();
    cy.wait(1000)
    cy.reload();
    cy.wait(1000)
});


Cypress.Commands.add('loginDataC', (user, login_type, context) => {
    cy.visit('https://data-compass.auriga.privyone.com/');
    cy.get('.pf-c-form__group').get('.pf-c-form-control').type("bot-admin@idfy.com")
    cy.get('.pf-c-button.pf-m-primary.pf-m-block', { includeShadowDom: true }).click()
    cy.get('#ak-stage-password-input', { includeShadowDom: true }).type("JcTgW2Wtgb")
    cy.get('.pf-c-button.pf-m-primary.pf-m-block', { includeShadowDom: true }).click()
    cy.wait(1000)
    cy.reload();
    cy.wait(1000)
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



