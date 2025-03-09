import constants from "../../support/constants";
import env from "../../support/env";
import locators from "../../support/locators";



describe("datacompass test", () => {

    let context;
        before(() => {
            context = env.context();
            cy.log(context);
        });
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
          });

    it("login to datacompass", () => {
         cy.loginDC(constants.login002, constants.datacompass, context);
    })
})