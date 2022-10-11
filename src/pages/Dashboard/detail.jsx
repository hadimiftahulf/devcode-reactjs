import {Typography} from '@mui/material'
import React, {useEffect} from 'react'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import EmptyState from '../../components/error/EmptyState'
import axios from 'axios'
import {API} from '../../utils/global'
import Alert from '../../components/dialog/Alert'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import EditIcon from '@mui/icons-material/Edit'
import {useHistory} from 'react-router'
import TextField from '@mui/material/TextField'
import FormDialog from '../../components/dialog/FormDialog'
import ListDetail from './list/ListDetail'

export default function Detail(props) {
  let history = useHistory()
  const [refresh, setRefresh] = React.useState(true)
  const [edit, setEdit] = React.useState({
    form: false,
    title: '',
  })
  const [data, setData] = React.useState({
    todo_items: [],
  })
  const [open, setOpen] = React.useState({
    modal: false,
    dialogForm: false,
    typeForm: 'add',
    id: false,
    name: '',
    data: [],
  })

  useEffect(() => {
    if (refresh) {
      axios
        .get(`${API}/activity-groups/${props.match.params.id}`)
        .then(({data}) => {
          setData(data)
          setEdit({...edit, title: data.title})
        })
        .catch((error) => {})
      setRefresh(false)
    }
  }, [refresh, props])

  const loadData = () => {
    setRefresh(true)
  }

  const addActivity = () => {
    setOpen({
      ...open,
      dialogForm: true,
      typeForm: 'add',
    })
  }

  const deleteActivity = () => {
    axios.delete(`${API}/todo-items/${open.id}`).then((response) => {
      setOpen({
        ...open,
        modal: false,
      })
      loadData()
    })
  }
  const anyKlik = () => {
    if (edit.form) {
      axios
        .patch(`${API}/activity-groups/${props.match.params.id}`, {
          title: `${edit.title}`,
        })
        .then((response) => {
          loadData()
        })
      setEdit({...edit, form: false})
    }
  }
  return (
    <div onClick={() => anyKlik()}>
      <div className="box-title">
        <div
          className={`flex center ${edit.form && 'fullWidth'}`}
          style={{paddingRight: '50px'}}
        >
          <ArrowBackIosIcon
            className="pointer"
            onClick={() => history.goBack()}
            data-cy="todo-back-button"
          />
          {edit.form ? (
            <TextField
              InputProps={{style: {fontSize: 36, fontWeight: 700}}}
              fullWidth
              onChange={(e) => {
                setEdit({
                  ...edit,
                  title: e.target.value,
                })
              }}
              autoFocus
              variant="standard"
              value={edit.title}
            />
          ) : (
            <Typography
              data-cy="todo-title"
              className="title-box"
              component="div"
              sx={{flexGrow: 1}}
              onClick={() => setEdit({...edit, form: true})}
            >
              {data.title}
            </Typography>
          )}

          <EditIcon
            data-cy="todo-title-edit-button"
            onClick={() => {
              let form = !edit.form
              setEdit({...edit, form: form})
            }}
            className="color-grey pointer"
            style={{paddingLeft: '10px'}}
          />
        </div>
        <Button
          className="button-add"
          variant="contained"
          data-cy="todo-add-button"
          onClick={() => addActivity()}
          startIcon={<AddIcon />}
        >
          Tambah
        </Button>
      </div>
      <div className="container-detail">
        {data && data?.todo_items.length > 0 ? (
          data.todo_items.map((row, index) => (
            <ListDetail key={index} row={row} open={open} setOpen={setOpen} />
          ))
        ) : (
          <EmptyState
            datacy={'todo-empty-state'}
            src={'../todo-empty-state.png'}
            onClick={() => addActivity()}
          />
        )}
      </div>
      <Alert
        open={open.modal}
        handleClose={() =>
          setOpen({
            ...open,
            modal: false,
          })
        }
        name={open.name}
        type={'List Item'}
        confirm={deleteActivity}
      />
      <FormDialog
        open={open.dialogForm}
        handleClose={() =>
          setOpen({
            ...open,
            dialogForm: false,
          })
        }
        data={open.data}
        typeForm={open.typeForm}
        id_activity={props.match.params.id}
        loadData={loadData}
      />
    </div>
  )
}
