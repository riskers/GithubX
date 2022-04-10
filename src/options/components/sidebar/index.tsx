import { DISCUSS_URL, GITHUB_URL, REPORT_BUG_URL } from '@/common/constants';
import { getVersion } from '@/common/tools';
import Accordion from '@/options/components/accordion';
import EditGroup from '@/options/components/edit-group';
import EditTag from '@/options/components/edit-tag';
import Logo from '@/options/components/header';
import { fetchGroups } from '@/options/slices/groupSlice';
import { selectedItemSlice, selectorItem } from '@/options/slices/selectedItemSlice';
import { settingsSlice, syncData } from '@/options/slices/settingsSlice';
import { fetchTags } from '@/options/slices/tagSlice';
import { RootState } from '@/options/store';
import { addGroup } from '@/services/idb/group';
import AddIcon from '@mui/icons-material/Add';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import RefreshIcon from '@mui/icons-material/Refresh';
import SellIcon from '@mui/icons-material/Sell';
import { Box, Button, ButtonGroup, Chip, Stack, TextField } from '@mui/material';
import classNames from 'classnames';
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SideBar = () => {
  const [openNewGroup, setOpenNewGroup] = React.useState<boolean>(false);
  const ref = React.useRef(null);

  const dispatch = useDispatch();
  const selectedItem = useSelector(selectorItem);
  const groups = useSelector((state: RootState) => state.groups);
  const tags = useSelector((state: RootState) => state.tags);

  React.useEffect(() => {
    (async () => {
      dispatch(fetchGroups());
      dispatch(fetchTags());
    })();
  }, [dispatch]);

  const handleOpenSettings = () => {
    dispatch(settingsSlice.actions.openSettingsModel());
  };

  const handleSyncData = () => {
    dispatch(syncData());
  };

  return (
    <div className="sidebar">
      <Logo />
      <div style={{ flex: 1, maxHeight: 'calc(100vh - 40px)' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" style={{ padding: '13px' }}>
          <Stack>STARS</Stack>
          <ButtonGroup>
            <Button onClick={handleOpenSettings} title="reset app">
              <RefreshIcon sx={{ fontSize: 14 }} />
            </Button>
            <Button title="Synchronize with the Github" onClick={handleSyncData}>
              <GetAppRoundedIcon color="success" sx={{ fontSize: 14 }} />
            </Button>
          </ButtonGroup>
        </Stack>
        <Accordion title="GROUPS" open>
          {groups.data?.map((group) => {
            return (
              <Stack
                key={group.id}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                style={{ padding: '0 13px' }}
                className="group-container"
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-start"
                  style={{ flex: 1 }}
                  className={classNames({
                    group: true,
                    selected: group.id === selectedItem.group.id,
                  })}
                  onClick={() => {
                    dispatch(selectedItemSlice.actions.selectGroup({ group }));
                  }}
                >
                  <AllInboxIcon fontSize="small" />
                  <div style={{ paddingLeft: 5 }}>{group.name}</div>
                </Stack>

                <Chip
                  className="star-number"
                  size="small"
                  label={group.totalStars}
                  sx={{
                    [`&`]: {
                      background: 'rgba(255,255,255, 0.1)',
                      color: '#FFF',
                    },
                  }}
                />

                {group.id !== 0 && <EditGroup name={group.name} id={group.id} />}
              </Stack>
            );
          })}
        </Accordion>

        <div style={{ margin: '20px 15px' }}>
          {openNewGroup && (
            <TextField
              style={{ marginBottom: 10 }}
              sx={{
                input: { color: '#dedede' },
                '& .MuiInputBase-input': {
                  color: '#fff',
                  background: '#051522',
                },
                '& .MuiFormLabel-root': {
                  color: '#606f7b',
                },
              }}
              fullWidth
              inputRef={ref}
              color="success"
              id="new-group"
              label="Enter a group name..."
              autoFocus
              defaultValue=""
              onBlur={() => {
                setOpenNewGroup(false);
              }}
              onKeyPress={async (e) => {
                if (e.key === 'Enter') {
                  const groupName = ref.current.value;

                  const isRepeat = groups.data.some((group) => group.name === groupName);

                  // input is not null and not repeat in groupList
                  if (groupName.trim() && !isRepeat) {
                    addGroup(groupName);
                    ref.current.value = '';
                    dispatch(fetchGroups());
                  }
                }
              }}
            />
          )}

          {!openNewGroup && (
            <Button
              disableRipple
              variant="outlined"
              fullWidth
              startIcon={<AddIcon />}
              onClick={() => {
                setOpenNewGroup(true);
              }}
            >
              Add a group
            </Button>
          )}
        </div>

        <Accordion title="TAGS" open>
          {tags.data?.map((tag) => {
            return (
              <Stack
                key={tag.id}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                style={{ padding: '0 13px' }}
                className="group-container"
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-start"
                  style={{ flex: 1 }}
                  className={classNames({
                    group: true,
                    selected: tag.id === selectedItem.tag?.id,
                  })}
                  onClick={() => {
                    dispatch(selectedItemSlice.actions.selectTag({ tag }));
                  }}
                >
                  <SellIcon fontSize="small" />
                  <div style={{ paddingLeft: 5 }}>{tag.name}</div>
                </Stack>

                <Chip
                  className="star-number"
                  size="small"
                  label={tag.totalStars}
                  sx={{
                    [`&`]: {
                      background: 'rgba(255,255,255, 0.1)',
                      color: '#FFF',
                    },
                  }}
                />

                <EditTag tag={tag} />
              </Stack>
            );
          })}
        </Accordion>
      </div>

      <Stack direction="row" justifyContent="space-between" style={{ padding: 13 }}>
        <Box>
          <a href={GITHUB_URL} target="_blank">
            {getVersion()}
          </a>
        </Box>
        <Box>
          <a href={REPORT_BUG_URL} target="_blank" style={{ marginRight: 10 }}>
            Report Bug
          </a>
          <a href={DISCUSS_URL} target="_blank">
            Discuss feature
          </a>
        </Box>
      </Stack>
    </div>
  );
};

export default SideBar;
