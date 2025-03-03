module.exports = Object.freeze({

    //Creds
    username: "//input[@id='username' or @id='loginId']",
    password: "//input[@id='password']",
    login_button: "//input[@id='kc-login'] | //button[normalize-space(text())='Submit']",
    logout_menu_button: "//button[@aria-label='Menu']//*[local-name()='svg']|//div[@class='dashboard-ellipsis-button']",
    logout_button: "//span[text()='Logout']|//button-element[@label='LOGOUT']",


    //Creds for DC 
    email: ".pf-c-form__group",
    login_button: ".pf-c-button.pf-m-primary.pf-m-block",
    password: "#ak-stage-password-input",
    continue_button: ".pf-c-button.pf-m-primary.pf-m-block" , 

    //Tasky 
    tasky_pendingtasks_count: "//div[@class='pending-tasks']/i[contains(text(),'tasks')]",
    tasky_menu_list: "//span[contains(@class,'MuiListItemText-primary') and normalize-space(text())='%s']",
    tasky_tabs: "//a[normalize-space(text())='%s']",
    tasky_tasktable_headers: "//section[contains(@class,'table-section')]//tr[@class='table-headings']/th",
    tasky_signed_out_successfully: "//h1[contains(text(),'Signed out successfully')]"

})
