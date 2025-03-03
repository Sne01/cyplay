import env from "../../support/env";
import report from "../../support/gchat_reports/gchat_report";

describe("read_excel", () => {

    let context;
    before(() => {
        context = env.context();
        cy.log(context);
    });

    it("read_excel", () => {
        cy.parse_xlsx(context.path + '/cypress/fixtures/test_data1.xlsx').then(json_data => {
            cy.log(json_data);
        })
    })

    after(() => {
        report.gchat_report("", Cypress.mocha.getRunner());
    });

})