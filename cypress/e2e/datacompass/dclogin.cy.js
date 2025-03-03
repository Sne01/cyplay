describe("login",()=>{
    it('login',() => {
        cy.visit('https://data-compass.auriga.privyone.com/')
        //cy.get('.pf-c-form-control', { includeShadowDom: true }).type("bot-admin@idfy.com")
        cy.get('.pf-c-form__group').get('.pf-c-form-control').type("bot-admin@idfy.com")
        cy.get('.pf-c-button.pf-m-primary.pf-m-block', { includeShadowDom: true }).click()
        cy.get('#ak-stage-password-input', { includeShadowDom: true }).type("JcTgW2Wtgb")
        cy.get('.pf-c-button.pf-m-primary.pf-m-block', { includeShadowDom: true }).click()
    })
})