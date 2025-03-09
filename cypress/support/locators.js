const { sub_domain, environment, service_details, service_name } = require("./constants");

module.exports = Object.freeze({

    //Creds
    username: "//input[@id='username' or @id='loginId']",
    password: "//input[@id='password']",
    login_button: "//input[@id='kc-login'] | //button[normalize-space(text())='Submit']",
    logout_menu_button: "//button[@aria-label='Menu']//*[local-name()='svg']|//div[@class='dashboard-ellipsis-button']",
    logout_button: "//span[text()='Logout']|//button-element[@label='LOGOUT']",


    //Creds for DC 
    email: ".pf-c-form-control",
    login_button: ".pf-c-button.pf-m-primary.pf-m-block",
    password: "#ak-stage-password-input",
    continue_button: ".pf-c-button.pf-m-primary.pf-m-block" , 

    shadowroot_email: "ak-flow-executor[flowslug='default-authentication-flow']",
    shadowroot_email2: "ak-stage-identification[theme='dark']",
    shadowroot_login_button: "ak-flow-executor[flowslug='default-authentication-flow']",
    shadowroot_login_button1: "ak-stage-identification[theme='dark']",

    shadowroot_password: "ak-flow-executor[flowslug='default-authentication-flow']" ,
    shadowroot_password1: "ak-stage-password[theme='dark']",
    shadowroot_continue_button: "ak-flow-executor[flowslug='default-authentication-flow'] ",
    shadowroot_continue_button1: "ak-stage-password[theme='dark']",

    //Tasky 
    tasky_pendingtasks_count: "//div[@class='pending-tasks']/i[contains(text(),'tasks')]",
    tasky_menu_list: "//span[contains(@class,'MuiListItemText-primary') and normalize-space(text())='%s']",
    tasky_tabs: "//a[normalize-space(text())='%s']",
    tasky_tasktable_headers: "//section[contains(@class,'table-section')]//tr[@class='table-headings']/th",
    tasky_signed_out_successfully: "//h1[contains(text(),'Signed out successfully')]",

    //asset creation navigation
    assetCreation: {
        assetsMenu: "//span[contains(text(),'Assets')]",
        createNewBtn: "//button[contains(text(),'Create New')]",
        serviceTypeSelector: "//div[contains(text(),'%s')]",
        primaryBtn: "//button[contains(text(),'Next')]"
    },
    // Service Configuration Locators
    serviceConfig: {
        domain: "//select[@id='submit_metadata_domain_id']",
        subDomain: "//select[@id='submit_metadata_sub_domain_id']",
        environment: "//select[@id='submit_metadata_environment_id']",
        serviceName: "//input[@id='submit_metadata_name']",
        label: "//input[@id='submit_metadata_display_name']",
        serviceDetails: "//input[@id='submit_metadata_description']",
        submitBtn: "//button[@type='submit']"
      },
      // Database Connection Locators
      dbConnection: {
        database: "//input[@id='submit_connection_details_database']",
        host: "//input[@id='submit_connection_details_host']",
        port: "//input[@id='submit_connection_details_port']",
        username: "//input[@id='submit_connection_details_username']",
        password: "//input[@id='submit_connection_details_password']",
        testConnection: "//button[@id='test-connection-button']",
        closeModal: "//button[@id='close-modal-btn']"
      }
    
    
})

