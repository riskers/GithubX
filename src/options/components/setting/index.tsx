import { fetchGroups } from '@/options/slices/groupSlice';
import { fetchSettings, resetAppData, settingsSlice } from '@/options/slices/settingsSlice';
import { fetchTags } from '@/options/slices/tagSlice';
import { RootState } from '@/options/store';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  TextField,
  Tooltip,
} from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePrevious } from 'react-use';

const Settings = () => {
  const dispatch = useDispatch();

  const settings = useSelector((state: RootState) => state.settings);
  const [token, setToken] = React.useState<string>('');

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
    if (!settings.loading) {
      dispatch(settingsSlice.actions.closeSettingsMode());
    }
  };

  return (
    <Dialog open={settings.open} fullWidth onClose={handleCloseSettings}>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <TextField
          id="token"
          variant="standard"
          autoFocus
          value={token}
          size="small"
          fullWidth
          placeholder="Github Token ..."
          onChange={(e) => {
            setToken(e.target.value);
          }}
        />
        <DialogContentText style={{ marginTop: 7 }}>
          <Link href="https://github.com/settings/tokens" target="_blank" underline="always" rel="noopener">
            <Box component="span">Apply Github Token ?</Box>
          </Link>
          <span style={{ marginLeft: 15, color: '#ccc' }}>storaged locally</span>
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Box sx={{ m: 1, position: 'relative' }}>
          <Button
            color="primary"
            variant="contained"
            disabled={settings.loading}
            onClick={async () => {
              dispatch(resetAppData(token));
            }}
          >
            OK
          </Button>
          {settings.loading && (
            <CircularProgress
              size={24}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default Settings;
