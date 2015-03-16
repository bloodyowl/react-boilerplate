export default (state, data) => {
  const routesWithData = state.routes.filter((route) => {
    return route.handler && route.handler.fetchData
  })
  return Promise.all(routesWithData.map((route) => {
    return route.handler.fetchData(state, data)
  }))
}
