import {Typography} from '@mui/material'
import React, {useEffect} from 'react'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import EmptyState from '../../components/error/EmptyState'
import axios from 'axios'
import {API, BASE_EMAIL} from '../../utils/global'
import DeleteIcon from '@mui/icons-material/Delete'
import moment from 'moment/moment'
import Alert from '../../components/dialog/Alert'
import {useHistory} from 'react-router'
import Snackbar from '@mui/material/Snackbar'

import MuiAlert from '@mui/material/Alert'

const AlertSnack = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function Dashboard(props) {
  const history = useHistory()
  const [refresh, setRefresh] = React.useState(true)
  const [data, setData] = React.useState([])
  const [open, setOpen] = React.useState({
    modal: false,
    alert: false,
    id: false,
    name: '',
  })

  const handleClickOpen = (id, name) => {
    setOpen({
      modal: true,
      id: id,
      name: name,
    })
  }

  const handleClose = () => {
    setOpen({
      ...open,
      modal: false,
    })
  }

  useEffect(() => {
    if (refresh) {
      axios
        .get(`${API}/activity-groups?email=${BASE_EMAIL}`)
        .then(({data}) => {
          setData(data.data)
        })
        .catch((error) => {})
      setRefresh(false)
    }
  }, [refresh, props])

  const loadData = () => {
    setRefresh(true)
  }

  const addActivity = () => {
    axios
      .post(`${API}/activity-groups/`, {
        title: `New Activity`,
        email: `${BASE_EMAIL}`,
      })
      .then((response) => {
        loadData()
      })
  }

  const deleteActivity = () => {
    axios.delete(`${API}/activity-groups/${open.id}`).then((response) => {
      loadData()
      handleClose()
      setOpen({...open, alert: true, modal: false})
    })
  }
  return (
    <>
      <div className="box-title">
        <Typography
          data-cy="activity-title"
          className="title-box"
          component="div"
          sx={{flexGrow: 1}}
        >
          Activity
        </Typography>
        <Button
          className="button-add"
          variant="contained"
          data-cy="activity-add-button"
          onClick={() => addActivity()}
          startIcon={<AddIcon />}
        >
          Tambah
        </Button>
      </div>
      <div className="container-dashboard">
        {data.length > 0 ? (
          data.map((row, index) => (
            <div key={index} className="card-dashboard" data-cy="activity-item">
              <div
                className="content-activity pointer"
                onClick={() => {
                  history.push(`/detail/${row.id}`)
                }}
              >
                <Typography
                  data-cy="activity-item-title"
                  className="text-title"
                  component="div"
                  sx={{flexGrow: 1}}
                >
                  {row.title}
                </Typography>
              </div>
              <div className="content-activity end">
                <Typography
                  data-cy="activity-item-date"
                  className="text-small color-grey"
                  component="div"
                  sx={{flexGrow: 1}}
                >
                  {moment(row.created_at).format('DD MMMM YYYY')}
                </Typography>
                <DeleteIcon
                  className="color-grey pointer"
                  data-cy="activity-item-delete-button"
                  onClick={() => handleClickOpen(row.id, row.title)}
                />
              </div>
            </div>
          ))
        ) : (
          <EmptyState
            datacy={'activity-empty-state'}
            src={'activity-empty-state.png'}
            onClick={() => addActivity()}
          />
        )}
      </div>
      <Alert
        open={open.modal}
        name={open.name}
        type={'activity'}
        handleClose={handleClose}
        confirm={deleteActivity}
      />
      <Snackbar
        open={open.alert}
        autoHideDuration={6000}
        onClose={() => setOpen({...open, alert: false})}
      >
        <AlertSnack
          data-cy="modal-information-icon"
          onClose={() => setOpen({...open, alert: false})}
          sx={{width: '100%'}}
        >
          <span data-cy="modal-information-title">
            Activity berhasil dihapus
          </span>
        </AlertSnack>
      </Snackbar>
    </>
  )
}
