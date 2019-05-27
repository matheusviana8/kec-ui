export const environment = {
  production: true,
  apiUrl: 'https://kec-api.herokuapp.com',
  
  tokenWhitelistedDomains: [ new RegExp('https://kec-inforstore.herokuapp.com') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};