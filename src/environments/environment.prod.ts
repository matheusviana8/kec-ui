export const environment = {
  production: true,
  apiUrl: 'https://kec-api.herokuapp.com',
  
  tokenWhitelistedDomains: [ new RegExp('algamoney-api.herokuapp.com') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};