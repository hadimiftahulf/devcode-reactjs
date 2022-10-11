import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

export default function Header() {
  return (
    <AppBar className="header" position="static" data-cy="header-background">
      <Toolbar className="container">
        <Typography
          data-cy="header-title"
          className="title"
          // variant="h6"
          component="div"
          sx={{flexGrow: 1}}
        >
          TO DO LIST APP
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
