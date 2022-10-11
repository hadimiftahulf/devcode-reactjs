import React, {useEffect} from 'react'
import NotFoundComponent from './error/NotFoundComponent'

const Main = (props) => {
  const WrapperComponent = props.children
  useEffect(() => {
    document.title = props.settings.title
  }, props)

  if (props.settings) {
    return <WrapperComponent {...props} />
  } else {
    return <NotFoundComponent />
  }
}

export default Main
