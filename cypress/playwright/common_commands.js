const { expect } = require('@playwright/test');
const util = require('util');
var locators = require('../support/locators');
var constants = require('../support/constants');

/**
 * Common login function
 * @param {*} login_type => string (dashboard/agent)
 * @param {*} context => cyprees context
 * @param {*} page => current page
 */
async function login(user, login_type, context, page) {
  page.goto(context.client_data[login_type]);
  await page.locator(locators.username).fill(context.creds[user].email);
  await page.locator(locators.password).fill(context.creds[user].password);
  await page.locator(locators.login_button).click();
  await page.waitForTimeout(2000);
  await page.reload();
  await page.waitForTimeout(2000);
}

/**
 * Common login function
 * @param {*} login_type => string (dashboard/agent)
 * @param {*} page => current page
 */
async function logout(login_type, page) {
  if (login_type == constants.dashboard) {
    await page.locator(locators.logout_menu_button).click();
    await page.locator(locators.logout_button).click();
    await expect(page.locator(locators.login_button)).not.toBeVisible();
  } else if (login_type == constants.tasky) {
    await page.locator(util.format(locators.tasky_tabs, "Sign Out")).click();
    await expect(page.locator(util.format(locators.tasky_tabs, "Sign Out"))).not.toBeVisible();
  } else {
    await page.locator(locators.logout_menu_button).click();
    await page.locator(locators.logout_button).click();
    await expect(page.locator(locators.logout_button)).not.toBeVisible();
  }
}

async function get_text_using_xpath(xpaths, page) {
  await page.locator("(" + xpaths + ")[1]").waitFor();
  const elements = await page.$$(xpaths);
  var array = new Array();
  for (const element of elements) {
    const text = await element.textContent();
    array.push(text.trim());
  }
  return array;
}

module.exports = {
  login, logout, get_text_using_xpath
}
