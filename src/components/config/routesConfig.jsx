import React from 'react'
import {Redirect} from 'react-router-dom'
import {MainConfig} from '../../pages/MainConfig'
import {generateRoutesFromConfigs} from '../../utils/helper'

const routeConfigs = [MainConfig]

const routes = [
  ...generateRoutesFromConfigs(routeConfigs),
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/home" />,
  },
]

export default routes
