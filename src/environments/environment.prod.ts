export const environment = {
  production: true,
  apiUrl: 'https://kec-api.herokuapp.com',
  
  tokenWhitelistedDomains: [ new RegExp('localhost:8080') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};