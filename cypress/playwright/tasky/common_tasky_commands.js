const util = require('util');
const { expect } = require('@playwright/test');
const locators = require('../../support/locators');

/**
 * Navigate to Page
 * @param {*} select_list => string (Name of the list e.g. 'Review pending')
 * @param {*} page => current page
 */
async function navigate_to_page(select_list, page) {
    await page.locator(locators.logout_menu_button).click({ force: true });
    await page.waitForTimeout(2000);
    await page.locator(util.format(locators.tasky_menu_list, select_list)).click({ force: true });
    console.log("Navigation completed to " + select_list);
}

/**
 * Function to switch between tasky tabs
 * @param {*} tab => string (My Tasks/Manage Tasks/Realtime Tasks)
 * @param {*} page => current page
 */
async function switch_tasky_tabs(tab, page) {
    await page.locator(util.format(locators.tasky_tabs, tab)).waitFor();
    await page.locator(util.format(locators.tasky_tabs, tab)).click({ force: true });
    console.log("Switched to tab : " + tab);
}

module.exports = {
    navigate_to_page, switch_tasky_tabs
}