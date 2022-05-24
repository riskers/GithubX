import { DISCUSS_URL, GITHUB_URL, REPORT_BUG_URL } from '@/common/constants';
import { getVersion } from '@/common/tools';
import Logo from '@/options/components/header';
import Settings from '@/options/components/setting';
import TabPanel, { TABS } from '@/options/components/sidebar/components/tab-panel';
import Tag from '@/options/components/sidebar/components/tag';
import { getGistListByGroup, getGistListByTag } from '@/options/slices/gistSlice';
import { fetchGroups } from '@/options/slices/groupSlice';
import { selectedItemSlice, selectorItem } from '@/options/slices/selectedItemSlice';
import { settingsSlice, syncData } from '@/options/slices/settingsSlice';
import { fetchStarsByGroup, fetchStarsByTag } from '@/options/slices/starsSlice';
import { fetchTags } from '@/options/slices/tagSlice';
import { RootState } from '@/options/store';
import { IGroupModel } from '@/services/model/group';
import { ITagModel } from '@/services/model/tag';
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Button, ButtonGroup, Stack, Tab, Tabs } from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import Group from './components/group';

const SideBar = () => {
  const dispatch = useDispatch();
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

  const hanleStarSelectGroup = React.useCallback(
    (group: IGroupModel) => {
      dispatch(selectedItemSlice.actions.starSelectGroup({ group }));
      dispatch(fetchStarsByGroup({ groupId: group.id }));
    },
    [dispatch],
  );

  const hanleGistSelectGroup = React.useCallback(
    (group: IGroupModel) => {
      dispatch(selectedItemSlice.actions.gistSelectGroup({ group }));
      dispatch(getGistListByGroup({ groupId: group.id }));
    },
    [dispatch],
  );

  const handleStarSelectTag = React.useCallback(
    (tag: ITagModel) => {
      dispatch(selectedItemSlice.actions.starSelectTag({ tag }));
      dispatch(fetchStarsByTag({ tagId: tag.id }));
    },
    [dispatch],
  );

  const handleGistSelectTag = React.useCallback(
    (tag: ITagModel) => {
      dispatch(selectedItemSlice.actions.gistSelectTag({ tag }));
      dispatch(getGistListByTag({ tagId: tag.id }));
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
            <Button onClick={handleOpenSettings} title={chrome.i18n.getMessage('reset_app')}>
              <RefreshIcon sx={{ fontSize: 14 }} />
            </Button>
            <Button title={chrome.i18n.getMessage('syn_with_github')} onClick={handleSyncData}>
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
                dispatch(selectedItemSlice.actions.selectType({ type: TABS[index].type }));
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
              <Group groups={groups} type="STAR" count="starCount" selectGroup={hanleStarSelectGroup} />
              <Tag tags={tags} type="STAR" count="starCount" selectTag={handleStarSelectTag} />
            </Box>
          </TabPanel>

          <TabPanel value={TABS[1].index} index={tabIndex}>
            <Box style={{ paddingBottom: 30 }}>
              <Group groups={groups} type="GIST" count="gistCount" selectGroup={hanleGistSelectGroup} />
              <Tag tags={tags} type="GIST" count="gistCount" selectTag={handleGistSelectTag} />
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
              {chrome.i18n.getMessage('report_bug')}
            </a>
            <a href={DISCUSS_URL} target="_blank">
              {chrome.i18n.getMessage('discuss_feature')}
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
