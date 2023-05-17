const contentfulManagement = require("contentful-management")

// CONTENTFUL_SPACE_ID=280j53ipcahw
// CONTENTFUL_ACCESS_KEY=NazMML2j2Clyj7t6RrAjz6Yl-WwhW1aazAoM5skPW0c
// CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN=CFPAT-y02Tb7o8qFK2fbruAV_Q5B8TM9IahIsCLfand1GR_Gc
// CONTENTFUL_ENVIRONMENT=master

module.exports = function() {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: 'CFPAT-y02Tb7o8qFK2fbruAV_Q5B8TM9IahIsCLfand1GR_Gc',
  })

  return contentfulClient
    .getSpace('280j53ipcahw')
    .then(space => space.getEnvironment('master'))
}