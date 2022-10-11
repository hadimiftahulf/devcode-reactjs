import * as React from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import {styled} from '@mui/material/styles'
import {TextField} from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Select from '@mui/material/Select'
import {API} from '../../utils/global'
import axios from 'axios'
import {colorBox} from '../../utils/helper'

const BootstrapDialog = styled(Dialog)(({theme}) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

const BootstrapDialogTitle = (props) => {
  const {children, onClose, ...other} = props

  return (
    <DialogTitle sx={{m: 0, p: 2}} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}

export default function FormDialog({
  title,
  open,
  handleClose,
  typeForm,
  id_activity,
  loadData,
  data,
}) {
  const [value, setValue] = React.useState({
    name: null,
    priority: 'very-high',
  })

  React.useEffect(() => {
    if (typeForm === 'edit') {
      setValue({
        name: data.title,
        priority: data.priority,
      })
    } else {
      setValue({
        name: '',
        priority: 'very-high',
      })
    }
  }, [open, typeForm])
  const dataPriority = [
    {
      name: 'Very High',
      value: 'very-high',
    },
    {
      name: 'High',
      value: 'high',
    },
    {
      name: 'Medium',
      value: 'medium',
    },
    {
      name: 'Low',
      value: 'low',
    },
    {
      name: 'Very Low',
      value: 'very-low',
    },
  ]
  const addToDo = () => {
    if (typeForm === 'add') {
      axios
        .post(`${API}/todo-items`, {
          activity_group_id: id_activity,
          priority: value.priority,
          title: value.name,
        })
        .then((response) => {
          loadData()
          handleClose()
        })
    } else {
      axios
        .patch(`${API}/todo-items/${data.id}`, {
          is_active: 1,
          priority: value.priority,
          title: value.name,
        })
        .then((response) => {
          loadData()
          handleClose()
        })
    }
  }
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth={'md'}
      fullWidth={true}
    >
      <BootstrapDialogTitle
        className="text-title"
        id="customized-dialog-title"
        onClose={handleClose}
      >
        {typeForm === 'add' ? 'Tambah List Item' : 'Edit Item'}
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Stack
          component="form"
          // fullWidth
          spacing={2}
          noValidate
          autoComplete="off"
        >
          <InputLabel
            className="textTransformNone text-small-bold"
            id="demo-simple-select-label"
          >
            NAMA LIST ITEM
          </InputLabel>
          <TextField
            value={value.name}
            className="textTransformNone text-title"
            fullWidth
            onChange={(e) => {
              setValue({
                ...value,
                name: e.target.value,
              })
            }}
          />
          <InputLabel
            className="textTransformNone text-small-bold"
            id="demo-simple-select-label"
          >
            PRIORITY
          </InputLabel>
          <Select
            className="textTransformNone"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            style={{width: '220px'}}
            value={value.priority}
            onChange={(e) => {
              setValue({
                ...value,
                priority: e.target.value,
              })
            }}
          >
            {dataPriority.map((row) => (
              <MenuItem value={row.value}>
                <span className={`dot ${colorBox(row.value)}`} /> {row.name}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          className="button-add"
          variant="contained"
          data-cy="modal-add-save-button"
          disabled={value.name === '' || value.name === null}
          onClick={() => addToDo()}
        >
          Simpan
        </Button>
      </DialogActions>
    </BootstrapDialog>
  )
}
