import './App.css'
import Header from './components/layout/Header'
import {Route, Switch} from 'react-router-dom'
import Main from './components/Main'
import routes from './components/config/routesConfig'
import React from 'react'
import NotFoundComponent from './components/error/NotFoundComponent'

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          {routes.map((val, key) => (
            <Route
              exact={val.exact}
              key={key}
              path={val.path}
              render={(props) => (
                <Main {...props} settings={val.settings}>
                  {val.component}
                </Main>
              )}
            />
          ))}
          <Route component={NotFoundComponent} />
        </Switch>
      </div>
    </>
  )
}

export default App
