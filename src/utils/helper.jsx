export function setRoutes(config) {
  let routes = [...config.routes]

  if (config.settings || config.auth) {
    routes = routes.map((route) => {
      let auth = config.auth ? [...config.auth] : []
      auth = route.auth ? [...auth, ...route.auth] : auth
      return {
        ...route,
        settings: {
          ...config.settings,
          ...route.settings,
        },
        auth,
      }
    })
  }

  return [...routes]
}

export function generateRoutesFromConfigs(configs) {
  let allRoutes = []
  configs.forEach((config) => {
    allRoutes = [...allRoutes, ...setRoutes(config)]
  })
  return allRoutes
}

export function colorBox(prority) {
  if (prority === 'very-high') {
    return 'bg-red'
  } else if (prority === 'high') {
    return 'bg-orange'
  } else if (prority === 'medium') {
    return 'bg-green'
  } else if (prority === 'low') {
    return 'bg-blue'
  } else if (prority === 'very-low') {
    return 'bg-purple'
  }
}
