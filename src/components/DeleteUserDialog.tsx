import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { User } from '../types';

interface DeleteUserDialogProps {
    user: User;
    onClose: () => void;
    onConfirm: () => void;
  }

const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({ user, onClose, onConfirm }) => {

  return (
      <Dialog
        open={true}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          { `Are you sure you want to delete ${user.name.first}?` }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action is irrevesrible as this is a demo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Disagree</Button>
          <Button onClick={onConfirm} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default DeleteUserDialog;