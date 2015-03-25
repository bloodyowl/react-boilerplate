const reqPaths = [
  "./web_modules",
  "./src",
]
reqPaths.forEach(path => {
  const req = require.context(
    path,
    true,
    /__tests__\/\S+\.js$/
  )
  req.keys().forEach(req)
})
