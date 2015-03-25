[
  "./web_modules",
  "./src",
].forEach(path => {
  const req = require.context(
    path,
    true,
    /__tests__\/\S+\.js$/
  )
  req.keys().forEach(req)
})
