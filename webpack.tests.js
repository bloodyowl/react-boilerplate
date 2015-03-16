const webModulesReq = require.context(
  "./web_modules",
  true,
  /__tests__\/\S+\.js$/
)
webModulesReq.keys().forEach(webModulesReq)

const srcReq = require.context(
  "./src",
  true,
  /__tests__\/\S+\.js$/
)
srcReq.keys().forEach(srcReq)
