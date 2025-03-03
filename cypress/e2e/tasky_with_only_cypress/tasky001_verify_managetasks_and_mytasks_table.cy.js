import constants from "../../support/constants";
import env from "../../support/env";
import report from "../../support/gchat_reports/gchat_report";
import suite_id from "../../support/gchat_reports/testlodge_testsuite_id";
import locators from "../../support/locators";

describe("Tasky Sanity", () => {

    let context;
    before(() => {
        context = env.context();
        cy.log(context);
    });

    it("tasky001_verify_managetasks_and_mytasks_table", () => {

        cy.login(constants.login001, constants.dashboard, context);
        cy.navigate_to_page(constants.review_pending)// Navigate to Review Pending Page

        //Manage Tasks Table
        cy.switch_tasky_tabs(constants.manage_tasks);
        cy.xpath(locators.tasky_pendingtasks_count, { timeout: 2_000 }).should('be.visible');
        cy.get_text_using_xpath(locators.tasky_tasktable_headers).then(headers => {
            expect(headers).to.deep.eq([constants.profile_id, constants.reference_id, constants.reviewer, constants.skills, constants.status, constants.vc_agent, constants.time, ""]);// Verify MTT Headers
        });
        cy.logout(constants.tasky);

    });

    after(() => {
        report.gchat_report(suite_id.tasky_sanity, Cypress.mocha.getRunner());
    });
})