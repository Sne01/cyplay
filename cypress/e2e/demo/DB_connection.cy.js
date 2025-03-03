
import env from "../../support/env";

describe("Postgres DB connection",()=>{
    let context;
    before(() => {
        context = env.context();
    })

    it("DB_connection",() => {
        cy.task("pw_DB_connection", context);
    })
})  