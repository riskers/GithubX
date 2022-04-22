import { NotifySlice } from '@/options/slices/notifySlice';
import { RootState } from '@/options/store';
import { Alert, AlertTitle, Snackbar } from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const GlobalAlert: React.FC = () => {
  const notifyState = useSelector((state: RootState) => state.notify);

  const { open, message, level } = notifyState;
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(NotifySlice.actions.close());
  };

  return (
    <Snackbar autoHideDuration={1500} open={open} onClose={handleClose}>
      <Alert onClose={handleClose} severity={level} sx={{ width: '100%' }} variant="filled">
        <AlertTitle>{level.toUpperCase()}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalAlert;
