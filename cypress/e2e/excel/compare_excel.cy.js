import env from "../../support/env";
import report from "../../support/gchat_reports/gchat_report";

describe("compare_excel", () => {

    let context;
    before(() => {
        context = env.context();
        cy.log(context);
    });

    it("compare_excel", () => {
        var expected;
        cy.parse_xlsx(context.path + '/cypress/fixtures/test_data1.xlsx').then(json_data => {
            expected = json_data;
        })
        cy.parse_xlsx(context.path + '/cypress/fixtures/test_data2.xlsx').then(actual => {
            expect(JSON.stringify(actual)).to.eq(JSON.stringify(expected));
        })
    })

    after(() => {
        report.gchat_report("", Cypress.mocha.getRunner());
    });

})
