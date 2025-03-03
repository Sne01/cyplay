import env from "../../support/env";
import report from "../../support/gchat_reports/gchat_report";
import suite_id from "../../support/gchat_reports/testlodge_testsuite_id";

describe("Tasky Sanity", () => {

    let context;
    before(() => {
        context = env.context();
        cy.log(context);
    });

    it("tasky001_verify_managetasks_and_mytasks_table", () => {
        cy.task('pw_verify_managetasks_and_mytasks_table', context);
    });

    after(() => {
        report.gchat_report(suite_id.tasky_sanity, Cypress.mocha.getRunner());
    });
})
