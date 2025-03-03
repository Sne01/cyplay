export default Object.freeze({

    context() {

        if (typeof Cypress.env('gchat_reports') !== 'boolean') {
            Cypress.env('gchat_reports', Cypress.env('gchat_reports') === 'true')
            Cypress.env('email_reports', Cypress.env('email_reports') === 'true')
            Cypress.env('creds', JSON.parse(Cypress.env('creds')))
        }
        
        const context = {
            "channel": Cypress.env('channel'),
            "environment": Cypress.env('environment'),
            "client": Cypress.env('client'),
            "testlodge_project_id": Cypress.env('testlodge_project_id'),
            "gchat_reports": Cypress.env('gchat_reports'),
            "email_reports": Cypress.env('email_reports'),
            "headless": Cypress.browser.isHeadless,
            "creds": Cypress.env('creds'),
            "path": Cypress.config("fileServerFolder"),
            "ignoreHTTPSErrors": Cypress.env('ignoreHTTPSErrors'),
            "geolocation": Cypress.env('geolocation'),
            "permissions": Cypress.env('permissions'),
            "username": Cypress.env('username')
        }
        const staging = {
            "staging" : {
                "datacompass" : "https://data-compass.auriga.privyone.com/"
            }
        }

        const prod = {
            "janus": {
                "agent": "http://agent.video-kyc.idfy.com/?client_id=QA-Client-Journey_a049aa021055",
                "dashboard": "http://dashboard.kyc.idfy.com/?client_id=QA-Client-Journey_a049aa021055",
            },
            "pictor": {
                "agent": "https://agent-video-kyc.pictor.idfy.com/?client_id=QA-Client-Journey_a049aa021055",
                "dashboard": "https://dashboard.pictor.idfy.com/?client_id=QA-Client-Journey_a049aa021055",
            },
            "prod": {
                "create_profile_base_url": "https://api.kyc.idfy.com/sync/profiles",
                "get_package_base_url": "https://dashboard.kyc.idfy.com/backend/packages/"
            }
        }
        if (Cypress.env('environment') === "staging") {
            context.client_data = staging[Cypress.env('client')];
            context[Cypress.env('environment') + "_data"] = staging[Cypress.env('environment')];
        } else if (Cypress.env('environment') === "prod") {
            context.client_data = prod[Cypress.env('client')];
            context[Cypress.env('environment') + "_data"] = prod[Cypress.env('environment')];
        }
        return context;
    }

});

