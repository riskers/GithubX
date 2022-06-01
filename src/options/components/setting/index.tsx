import { fetchGroups } from '@/options/slices/groupSlice';
import { fetchSettings, resetAppData, settingsSlice } from '@/options/slices/settingsSlice';
import { fetchTags } from '@/options/slices/tagSlice';
import { RootState } from '@/options/store';
import {
  API_STORE_POSITION,
  API_URL_KEY,
  DEFAULT_STORE_POSITION,
  STORE_POSITION,
  STORE_POSITION_KEY,
} from '@/common/storage';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePrevious } from 'react-use';
import { useChromeStorageLocal } from 'use-chrome-storage';
import { DEPLOY_HELP_URL } from '@/common/constants';
import { TOKEN_KEY } from '../../../common/storage';

const Settings = () => {
  const dispatch = useDispatch();

  const settings = useSelector((state: RootState) => state.settings);
  const [position, setPosition] = useChromeStorageLocal(STORE_POSITION_KEY, DEFAULT_STORE_POSITION.v);
  const [apiUrl, setApiUrl] = useChromeStorageLocal(API_URL_KEY, '');
  const [token, setToken] = useChromeStorageLocal(TOKEN_KEY, '');

  React.useEffect(() => {
    dispatch(fetchSettings());
    dispatch(fetchGroups());
    dispatch(fetchTags());
  }, [dispatch]);

  const handleCloseSettings = () => {
    if (!settings.loading) {
      dispatch(settingsSlice.actions.closeSettingsMode());
    }
  };

  return (
    <Dialog open={settings.open} fullWidth onClose={handleCloseSettings}>
      <DialogTitle>{chrome.i18n.getMessage('setting_title')}</DialogTitle>
      <DialogContent dividers>
        <Typography> {chrome.i18n.getMessage('select_store_position')} </Typography>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <FormControl>
            <Select
              id="select-store-position"
              size="small"
              value={position}
              onChange={(event) => {
                const p = event.target.value as typeof STORE_POSITION[number]['v'];
                setPosition(p);
              }}
            >
              {STORE_POSITION.map((position) => {
                return (
                  <MenuItem key={position.v} value={position.v}>
                    {position.desc}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText>
              <span style={{ marginLeft: 15, color: '#ccc' }}>
                {position}
                {/* {chrome.i18n.getMessage(`store_${position?.toLowerCase()}`)} */}
              </span>
            </FormHelperText>
          </FormControl>

          {position === API_STORE_POSITION.v && (
            <TextField
              variant="standard"
              id="api-url"
              size="small"
              label={chrome.i18n.getMessage('setting_api_url')}
              value={apiUrl}
              onChange={(event) => {
                setApiUrl(event.target.value);
              }}
              helperText={<Link href={DEPLOY_HELP_URL}>help</Link>}
            />
          )}
        </Box>

        <Box display="flex" sx={{ '& > :not(style)': { m: 1 } }}>
          <TextField
            margin="dense"
            id="token"
            variant="standard"
            value={token}
            size="small"
            fullWidth
            placeholder="Your Github Token ..."
            onChange={(e) => {
              setToken(e.target.value);
            }}
            helperText={
              <Link href="https://github.com/settings/tokens" target="_blank" underline="always" rel="noopener">
                <Box component="span">{chrome.i18n.getMessage('apply_github_token')}</Box>
              </Link>
            }
          />
        </Box>
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
            {chrome.i18n.getMessage('start')}
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
