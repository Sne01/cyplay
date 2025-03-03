const { defineConfig } = require("cypress")

module.exports = defineConfig({
    defaultCommandTimeout: 100000,
    pageLoadTimeout: 100000,
    execTimeout: 100000,
    requestTimeout: 10000,
    responseTimeout: 50000,
    taskTimeout: 300000,
    includeShadowDom:true,
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
        reportDir: "cypress/reports",
        reportPageTitle: "Cyplay Test Automation Report",
        reportFilename: "cyplay_test_automation_report",
        inlineAssets: true,
        quite: true,
        json: true
    },
    screenshotOnRunFailure: true,
    screenshotsFolder: "cypress/reports/report/assets",
    video: false,
    e2e: {
        setupNodeEvents(on, config) {
            require("cypress-mochawesome-reporter/plugin")(on);
            return require("./cypress/plugins/index")(on, config);
        },
    },
    chromeWebSecurity: false,
    env: {
        pod_name: "cyplay",
        browserPermissions: {
            notifications: "allow",
            geolocation: "allow",
            camera: "allow",
            microphone: "allow",
            images: "allow",
            javascript: "allow",
            popups: "allow",
            plugins: "allow",
            cookies: "allow",
        },
        testlodge_project_id: 43984,
        testlodge_basic_auth: "Basic dnMuY29tbWFuZGNlbnRlckBpZGZ5LmNvbTpNNDlyRVJuSlNGblhjVndjTzJiaENNaGI1OFBsOUZmdmYzZDZKQUNCV0pKTEx6N0JsRXlCend0dA==",
        gchat_webhook_staging: "https://chat.googleapis.com/v1/spaces/AAAA9YQltfg/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=-t_HxFtLxn6FT_RXWnKKPFOHyMKprlniP1izZbq8nk8%3D",
        gchat_webhook_prod: "",
        gchat_reports: true,
        email_reports: true,
        email_group_staging: "siddesh.sadamastula@idfy.com,merwin.rodrigues@idfy.com,antony.raj@idfy.com,chintan.thakkar@idfy.com,rohit.narayane@idfy.com,sana.flairlabs@ext.idfy.com,sanjay.kumavat@idfy.com,sudhanshu.xoriant@ext.idfy.com,suhel.khan@idfy.com,vishal.nishad@idfy.com",
        email_group_prod: "siddesh.sadamastula@idfy.com,merwin.rodrigues@idfy.com,antony.raj@idfy.com,chintan.thakkar@idfy.com,rohit.narayane@idfy.com,sana.flairlabs@ext.idfy.com,sanjay.kumavat@idfy.com,sudhanshu.xoriant@ext.idfy.com,suhel.khan@idfy.com,vishal.nishad@idfy.com",
        ignoreHTTPSErrors: true,
        geolocation: {
            "longitude": 72.8747,
            "latitude": 19.0770
        },
        permissions: [
            "geolocation"
        ]
    }
})
