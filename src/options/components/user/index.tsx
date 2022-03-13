import { resetGroup } from '@/content_script/services/local/group';
import { getSettings, setSettings } from '@/content_script/services/local/settings';
import { resetStars } from '@/content_script/services/local/stars';
import { resetTag } from '@/content_script/services/local/tag';
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

const Settings = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [username, setUserName] = React.useState<string>('');
  const [syncPending, setSyncPending] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      const settings = await getSettings();
      const username = settings?.username ?? '';

      setUserName(username);
      if (username === '') {
        setOpen(true);
      }
    })();
  }, []);

  return (
    <Dialog open={open} fullWidth>
      <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
        {syncPending && <LinearProgress color="secondary" />}
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
            disabled={syncPending}
            onClick={async () => {
              setSyncPending(true);
              await setSettings({ username });
              await resetStars();
              await resetGroup();
              await resetTag();
              setSyncPending(false);
              setOpen(false);
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
