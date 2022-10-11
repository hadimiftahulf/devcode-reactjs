import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'

export default function Alert({open, handleClose, confirm, name, type}) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        data-cy="todo-modal-delete"
        maxWidth={'xs'}
        fullWidth={true}
      >
        <DialogContent className="center flex-column">
          <img
            src={'/modal-delete-icon.png'}
            className="center"
            style={{width: '70px', padding: '50px'}}
          />
          <div className="flex">
            <span className="title-alert" data-cy="modal-delete-title">
              {`Apakah anda yakin menghapus ${type}`}{' '}
              <span className="bold">“{name}”</span>?
            </span>
          </div>
        </DialogContent>
        <DialogActions className="center">
          <Button
            className="button-cancel"
            variant="contained"
            data-cy="modal-delete-cancel-button"
            onClick={() => handleClose()}
          >
            Batal
          </Button>
          <Button
            className="button-confirm"
            variant="contained"
            data-cy="modal-delete-confirm-button"
            onClick={() => confirm()}
          >
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
