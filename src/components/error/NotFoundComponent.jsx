import Paper from '@mui/material/Paper'
import React from 'react'

const customStyle = {
  tabsPerformance: {
    background: 'rgb(246, 248, 249)',
    boxShadow:
      'rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px',
  },
  paperPerformance: {
    padding: 24,
    color: 'red',
  },
}

const NotFoundComponent = () => {
  return (
    <Paper style={customStyle.paperPerformance}>
      <h3>403 Access Forbiden</h3>
    </Paper>
  )
}

export default NotFoundComponent
