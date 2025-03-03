const { expect } = require('@playwright/test');
const { login, get_text_using_xpath, logout } = require("../common_commands");
const { navigate_to_page, switch_tasky_tabs } = require("./common_tasky_commands");
const locators = require('../../support/locators');
const constants = require('../../support/constants');

process.env.DEBUG = 'pw:api,pw:browser*';

exports.verify_managetasks_and_mytasks_table = async function verify_managetasks_and_mytasks_table(context) {

    const page = await (await (context.browser).newContext()).newPage();

    await login(constants.login001, constants.dashboard, context, page); // login Tasky
    await navigate_to_page(constants.review_pending, page); // Navigate to Review Pending Page

    //Manage Tasks Table
    await switch_tasky_tabs(constants.manage_tasks, page);
    await expect(page.locator(locators.tasky_pendingtasks_count)).toBeVisible();// Verify Pending Task count in MTT
    var headers = await get_text_using_xpath(locators.tasky_tasktable_headers, page);
    expect(headers).toEqual([constants.profile_id, constants.reference_id, constants.reviewer, constants.skills, constants.status, constants.vc_agent, constants.time, ""]);// Verify MTT Headers

    await logout(constants.tasky, page);

    return true;
}


