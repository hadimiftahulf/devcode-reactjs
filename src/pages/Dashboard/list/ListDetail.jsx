import {Typography} from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import {colorBox} from '../../../utils/helper'
import axios from 'axios'
import {API} from '../../../utils/global'

function ListDetail({row, key, open, setOpen}) {
  const [checkBox, setCheckBox] = React.useState(row.is_active === 0)

  const editCheckbox = () => {
    axios
      .patch(`${API}/todo-items/${row.id}`, {
        is_active: checkBox ? 1 : 0,
      })
      .then(() => {
        setCheckBox(!checkBox)
      })
  }
  return (
    <div className="item-detail" data-cy="todo-item" key={key}>
      <div className={'flex center'}>
        <FormControlLabel
          data-cy="todo-item-checkbox"
          onClick={editCheckbox}
          control={<Checkbox checked={checkBox} />}
        />
        <span
          data-cy="todo-item-priority-indicator"
          className={`dot ${colorBox(row.priority)}`}
        />
        <Typography
          data-cy="todo-item-title"
          className={`text-small  ${checkBox && 'color-grey line-through'}`}
          component="div"
          sx={{flexGrow: 1}}
          style={{padding: '0px 14px'}}
        >
          {row.title}
        </Typography>
        <EditIcon
          onClick={() => {
            setOpen({
              ...open,
              dialogForm: true,
              typeForm: 'edit',
              data: row,
            })
          }}
          data-cy="todo-item-edit-button"
          className="color-grey pointer"
          style={{paddingLeft: '10px', fontSize: '15px'}}
        />
      </div>
      <DeleteIcon
        className="color-grey pointer"
        ddata-cy="todo-item-delete-button"
        onClick={() => {
          setOpen({
            modal: true,
            id: row.id,
            name: row.title,
          })
        }}
      />
    </div>
  )
}

export default ListDetail
