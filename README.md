# cyplay - Test Automation Framework

## 🎯 Core responsblity of Video Solutions Test Automation.

- Quaity Assurance of
  - Reviewer Dashboard
  - Operator Dashboard
  - Tasky - Profile Review
- Sanity Testing
- Regression Testing
- Progression Testing
- Reduce manual efforts, using automation

## 📄 Documentation

- [Confluence](https://idfy.atlassian.net/l/cp/K9o1A0Wu)

## 🔽 Pre-requisites

In order to run the project on local setup we need the following to be installed on development machines.

- [node.js](https://nodejs.org/en/)
- [Vs Code](https://code.visualstudio.com/)

## 🖥️ Local Setup

- Install dependencies

```bash
  npm i
```

- Create Local Environment
  - Create a new file with name 'cypress.env.json' in project folder
  - Update values as required in below json and add json to 'cypress.env.json' file
  - Examples :
    - "channel": "chrome", // browser
    - "environment": "staging", // on which environment
    - "client": "antmedia", // for which client
    - "gchat_Reports": true, // for gchat reports
    - "email": "vs.automation@idfy.com", // username for login
    - "password": "Password@123", // password for login

```json
{
  "channel": "chrome",
  "environment": "staging",
  "client": "antmedia",
  "gchat_reports": false,
  "creds": {
    "login001": {
      "email": "vs.automation@idfy.com",
      "password": "Password@123"
    }
  }
}
```

## 📜 Script execution

### Method 1 :

- To view all the scripts

```bash
  npx cypress open
```

- Select E2E Testing!
- Select required browser
- Click on 'Start E2E Testing in Chrome'
- Click on the script you want to execute

### Method 2 :

- Execute script through terminal
- Example: relative path of the spec file => cypress/e2e/Tasky/Tasky_Sanity.cy.js

```bash
  npx cypress run --env --headed --browser chrome --spec <relative path of the spec file>
```

## ✅ Script suggestions to run

| sr.no | scripts                                                                                 | environment | client   |
| ----- | --------------------------------------------------------------------------------------- | ----------- | -------- |
| 1     | cypress/e2e/demo/read_excel.cy.js                                                       | staging     | antmedia |
| 2     | cypress/e2e/demo/compare_excel.cy.js                                                    | staging     | antmedia |
| 3     | cypress/e2e/tasky_using_playwright/tasky001_tasky_sanity.cy.js                          | staging     | janus    |
| 4     | cypress/e2e/tasky_with_only_cypress/tasky001_verify_managetasks_and_mytasks_table.cy.js | staging     | janus    |

## 📶 Reports

- Cypress Window (for Method 1):
- Terminal (for Method 2):
- GChat Reports (for both Methods)

## ✨ Learn more

- [Cypress](https://docs.cypress.io/guides/overview/why-cypress)
- [Playwright](https://playwright.dev/docs/intro)
- [Testlodge](https://www.testlodge.com/)
- [Google Chat CardV2](https://developers.google.com/chat/api/reference/rest/v1/cards)
