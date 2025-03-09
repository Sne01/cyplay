// describe("login",()=>{
//     it('login',() => {
//         cy.visit('https://data-compass.auriga.privyone.com/')
//         //cy.get('.pf-c-form-control', { includeShadowDom: true }).type("bot-admin@idfy.com")
//         //cy.get('.pf-c-form__group').get('.pf-c-form-control').type("bot-admin@idfy.com")
//         cy.get("ak-flow-executor[flowslug='default-authentication-flow']")
//          .shadow()
//          .find("ak-stage-identification[theme='dark']")
//          .shadow()
//          .find(".pf-c-form-control")
//          .type("bot-admin@idfy.com"); // Replace with actual text

//        // cy.get('.pf-c-form__group').shadow().find('.pf-c-form-control').type('abc');
//         cy.get('.pf-c-button.pf-m-primary.pf-m-block', { includeShadowDom: true }).click()
//         cy.get('#ak-stage-password-input', { includeShadowDom: true }).type("JcTgW2Wtgb")
//         cy.get('.pf-c-button.pf-m-primary.pf-m-block', { includeShadowDom: true }).click()
//     })
// })


describe("Login Test", () => {
    it("Performs Login", () => {
        cy.visit("https://data-compass.auriga.privyone.com/");

        cy.get("ak-flow-executor[flowslug='default-authentication-flow']")
          .shadow()
          .find("ak-stage-identification[theme='dark']")
          .shadow()
          .find(".pf-c-form-control")
          .should("be.visible")
          .type("bot-admin@idfy.com");

       cy.get("ak-flow-executor[flowslug='default-authentication-flow']")
          .shadow()
          .find("ak-stage-identification[theme='dark']")
          .shadow()
          .find(".pf-c-button.pf-m-primary.pf-m-block")
          .should("be.visible")
          .click();

        cy.get("ak-flow-executor[flowslug='default-authentication-flow']")
          .shadow()
          .find("ak-stage-password[theme='dark']")
          .shadow()
          .find("#ak-stage-password-input")
          .should("be.visible")
          .type("JcTgW2Wtgb");

        cy.get("ak-flow-executor[flowslug='default-authentication-flow']")
          .shadow()
          .find("ak-stage-password[theme='dark']")
          .shadow()
          .find(".pf-c-button.pf-m-primary.pf-m-block")
          .should("be.visible")
          .click();

        // Ensure login is successful
        //cy.url().should("include", "/dashboard"); // Adjust based on your app's redirect
    });
});
