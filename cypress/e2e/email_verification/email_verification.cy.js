describe("Emai Verification Test Case", () => {
    it("Get URL from mail and navigate to that URL.", () => {
        var email_id = "cb5dfd35dd5633bd0bb06464f4d5e47d+1@inbound.postmarkapp.com";
        var subject = "SelfServe Password Reset Email!";
        var partial_link_text = "password_forgot?";

        cy.visit("https://apicentral.idfystaging.com/");
        cy.xpath("//a[text()='Forgot Password?']").click();
        cy.get("#password_reset_company_email").type(email_id);
        cy.get("#btn-reset-link").click();
        cy.wait(10000);
        cy.get_message_id(email_id, subject).then((message_id) => {
            cy.get_url_link(message_id, partial_link_text).then((url) => {
                cy.visit(url);
            })
        });
    })
})
