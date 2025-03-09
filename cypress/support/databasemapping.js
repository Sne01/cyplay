export const databaseFieldMappings = {
    postgres: {
      requiredFields: ['host', 'port', 'username', 'password', 'database', 'account'],
    
    },
    snowflake: {
        requiredFields: [ 'username', 'password', 'account','role','database', 'warehouse'],
      }
  };
  