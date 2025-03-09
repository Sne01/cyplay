import constants from '../../support/constants';
import env from '../../support/env';
import locators from "../../support/locators";

describe('Data Compass Asset Creation', () => {
  let context;
  let serviceConfig;

  before(() => {
    context = env.context();
    cy.log(context);
    
    // Load the service configuration
    cy.fixture('serviceConfig.json').then((config) => {
      serviceConfig = config;
    });
  });

  beforeEach(() => {
    cy.visit('https://data-compass.auriga.privyone.com/');
    cy.loginDC(constants.login002, constants.datacompass, context);
  });

  it('should create a new asset', () => {
     // Use the new command with database type parameter
     cy.navigateToServiceCreation(0)  // 0 for postgres

    // Configure service metadata using the command
    cy.configureServiceMetadata(serviceConfig.serviceMetadata);

    // Configure database connection directly in the test
    cy.xpath(locators.dbConnection.database).type(serviceConfig.connectionDetails.database)
    cy.xpath(locators.dbConnection.host).type(serviceConfig.connectionDetails.host)
    cy.xpath(locators.dbConnection.port).type(serviceConfig.connectionDetails.port)
    cy.xpath(locators.dbConnection.username).type(serviceConfig.connectionDetails.username)
    cy.xpath(locators.dbConnection.password).type(serviceConfig.connectionDetails.password)
    
   // Use the new command for test connection and submit
   cy.handleTestConnection();
  });
});