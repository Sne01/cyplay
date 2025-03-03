describe("Wait Test case", () => {
    it("Wait for text to be visible", () => {
        cy.visit("https://apicentral.idfystaging.com/");
        cy.get("#session_company_email").type("rohit.narayane@idfy.com");
        cy.get("#userLPassword").type("Idfy@1234");
        cy.get("button").click();
        cy.title().should("eq", "IDfy · SelfServe");

        //search api
        cy.get("#search_field_query").type("PAN GST Linkage Check").type('{enter}');
        cy.xpath("//span[normalize-space(text())='PAN GST Linkage Check']").click();
        cy.wait(2000);
        cy.xpath("//li[normalize-space(text())='Samples']").click();
        cy.wait(3000);
        cy.get("#submit-button-string").click();
        cy.get(".full-width").scrollTo('top');

        //wait for test 200
        cy.wait_for_text_to_be_visible("//span[@id='status-code-content']", "200");
    });
});