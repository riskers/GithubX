import { DISCUSS_URL, GITHUB_URL, REPORT_BUG_URL } from '@/common/constants';
import { getVersion } from '@/common/tools';
import Accordion from '@/options/components/accordion';
import EditTag from '@/options/components/edit-tag';
import Logo from '@/options/components/header';
import Settings from '@/options/components/setting';
import TabPanel, { TABS } from '@/options/components/sidebar/components/tab-panel';
import Tag from '@/options/components/sidebar/components/tag';
import { fetchGroups } from '@/options/slices/groupSlice';
import { selectedItemSlice, selectorItem } from '@/options/slices/selectedItemSlice';
import { settingsSlice, syncData } from '@/options/slices/settingsSlice';
import { fetchTags } from '@/options/slices/tagSlice';
import { RootState } from '@/options/store';
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Button, ButtonGroup, Chip, Stack, Tab, Tabs, TextField } from '@mui/material';
import classNames from 'classnames';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useLocation, useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import Group from './components/group';

const SideBar = () => {
  const dispatch = useDispatch();
  const selectedItem = useSelector(selectorItem);
  const groups = useSelector((state: RootState) => state.groups);
  const tags = useSelector((state: RootState) => state.tags);

  const location = useLocation();
  let resolved = useResolvedPath(location.pathname);
  let match = useMatch({ path: resolved.pathname, end: true });

  const initIndex = React.useMemo(() => {
    return TABS.findIndex((tab) => match.pathname === tab.url);
  }, [match]);

  const [tabIndex, setTabIndex] = React.useState<number>(initIndex);

  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      dispatch(fetchGroups());
      dispatch(fetchTags());
    })();
  }, [dispatch]);

  const hanleSelectGroup = React.useCallback(
    (group) => {
      dispatch(selectedItemSlice.actions.selectGroup({ group }));
    },
    [dispatch],
  );

  const handleSelectTag = React.useCallback(
    (tag) => {
      dispatch(selectedItemSlice.actions.selectTag({ tag }));
    },
    [dispatch],
  );

  const handleOpenSettings = () => {
    dispatch(settingsSlice.actions.openSettingsModel());
  };

  const handleSyncData = () => {
    dispatch(syncData());
  };

  return (
    <div className="github-plus-app">
      <div className="sidebar">
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ padding: '13px' }}>
          <Logo />
          <ButtonGroup>
            <Button onClick={handleOpenSettings} title="reset app">
              <RefreshIcon sx={{ fontSize: 14 }} />
            </Button>
            <Button title="Synchronize with the Github" onClick={handleSyncData}>
              <GetAppRoundedIcon color="success" sx={{ fontSize: 14 }} />
            </Button>
          </ButtonGroup>
        </Stack>

        <Box>
          <Box style={{ padding: 13 }}>
            <Tabs
              centered
              variant="fullWidth"
              value={tabIndex}
              onChange={(event, index) => {
                navigate(TABS[index].url, { replace: false });
                setTabIndex(index);
              }}
            >
              {TABS.map((tab) => {
                return (
                  <Tab
                    disableRipple
                    label={tab.title}
                    key={tab.index}
                    sx={{
                      '&': {
                        color: '#ccc',
                      },
                    }}
                  />
                );
              })}
            </Tabs>
          </Box>

          <TabPanel value={TABS[0].index} index={tabIndex}>
            <Box style={{ paddingBottom: 30 }}>
              <Group groups={groups} count="starCount" selectGroup={hanleSelectGroup} />
              <Tag tags={tags} count="starCount" selectTag={handleSelectTag} />
            </Box>
          </TabPanel>

          <TabPanel value={TABS[1].index} index={tabIndex}>
            <Box style={{ paddingBottom: 30 }}>
              <Group groups={groups} count="gistCount" selectGroup={hanleSelectGroup} />
              <Tag tags={tags} count="gistCount" selectTag={handleSelectTag} />
            </Box>
          </TabPanel>
        </Box>

        <Stack
          direction="row"
          justifyContent="space-between"
          style={{ padding: 13, position: 'fixed', bottom: 0, width: 260, background: '#13283a' }}
        >
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

      <Settings />

      <Outlet />
    </div>
  );
};

export default SideBar;
