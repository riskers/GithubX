import { fetchGroups } from '@/options/slices/groupSlice';
import { clearData, fetchSettings, settingsSlice } from '@/options/slices/settingsSlice';
import { fetchTags } from '@/options/slices/tagSlice';
import { RootState } from '@/options/store';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Settings = () => {
  const dispatch = useDispatch();

  const settings = useSelector((state: RootState) => state.settings);
  const [username, setUserName] = React.useState<string>('');

  React.useEffect(() => {
    dispatch(fetchSettings());
    dispatch(fetchGroups());
    dispatch(fetchTags());
  }, [dispatch, settings.data.username]);

  const handleCloseSettings = () => {
    dispatch(settingsSlice.actions.closeSettingsMode());
  };

  const isOpen = () => {
    return settings.open || settings.data.username === '';
  };

  return (
    <Dialog open={isOpen()} fullWidth onClose={handleCloseSettings}>
      <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
        {settings.loading && <LinearProgress color="secondary" />}
      </Stack>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <TextField
          id="username"
          variant="standard"
          autoFocus
          value={username}
          size="small"
          fullWidth
          placeholder="github name..."
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />

        <DialogContentText style={{ color: '#60616f', marginTop: 7 }} />
      </DialogContent>

      <DialogActions>
        <Tooltip title="All data will storage in local.">
          <Button
            color="primary"
            variant="contained"
            disabled={settings.loading}
            onClick={async () => {
              dispatch(clearData(username));
            }}
          >
            OK
          </Button>
        </Tooltip>
      </DialogActions>
    </Dialog>
  );
};

export default Settings;
