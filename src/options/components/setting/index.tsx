import { fetchGroups } from '@/options/slices/groupSlice';
import { resetAppData, fetchSettings, settingsSlice } from '@/options/slices/settingsSlice';
import { fetchTags } from '@/options/slices/tagSlice';
import { RootState } from '@/options/store';
import { usePrevious } from 'react-use';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Tooltip,
} from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Settings = () => {
  const dispatch = useDispatch();

  const settings = useSelector((state: RootState) => state.settings);
  const [username, setUserName] = React.useState<string>('');

  const updateTime = usePrevious(settings.data.updatedTime);
  const isUpdate = React.useMemo(() => {
    return updateTime === settings.data.updatedTime;
  }, [settings.data.updatedTime, updateTime]);

  React.useEffect(() => {
    dispatch(fetchSettings());
    dispatch(fetchGroups());
    dispatch(fetchTags());
  }, [dispatch, isUpdate]);

  const handleCloseSettings = () => {
    dispatch(settingsSlice.actions.closeSettingsMode());
  };

  return (
    <Dialog open={settings.open} fullWidth onClose={handleCloseSettings}>
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

        <DialogContentText style={{ color: '#d1d1d6', marginTop: 7 }}>
          This will cause the App to reset.
          <br />
          If this is your first startup, ignore this message.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Tooltip title="All data will storage in local.">
          <Button
            color="primary"
            variant="contained"
            disabled={settings.loading}
            onClick={async () => {
              dispatch(resetAppData(username));
              if (isUpdate) {
                setUserName('');
              }
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
