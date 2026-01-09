import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Logo from '@/entrypoints/options/components/header';
import { TABS } from '@/entrypoints/options/components/sidebar/components/tab-panel';
import Tag from '@/entrypoints/options/components/sidebar/components/tag';
import { fetchGroups } from '@/entrypoints/options/slices/groupSlice';
import { selectedItemSlice } from '@/entrypoints/options/slices/selectedItemSlice';
import { settingsSlice, syncData } from '@/entrypoints/options/slices/settingsSlice';
import { fetchTags } from '@/entrypoints/options/slices/tagSlice';
import { RootState } from '@/entrypoints/options/store';
import { IGroupModel } from '@/services/model/group';
import { ITagModel } from '@/services/model/tag';
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Button, ButtonGroup, Stack } from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Group from './components/group';

const SideBar = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state: RootState) => state.groups);
  const tags = useSelector((state: RootState) => state.tags);

  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = React.useMemo<(typeof TABS)[number]['type']>(() => {
    const matchedTab = TABS.find((tab) => tab.url === location.pathname);
    return matchedTab?.type ?? TABS[0].type;
  }, [location.pathname]);

  const handleTabValueChange = React.useCallback(
    (value: string) => {
      const matchedTab = TABS.find((tab) => tab.type === value);
      if (!matchedTab) return;

      navigate(matchedTab.url, { replace: false });
      dispatch(selectedItemSlice.actions.selectType({ type: matchedTab.type }));
    },
    [dispatch, navigate],
  );

  React.useEffect(() => {
    (async () => {
      dispatch(fetchGroups());
      dispatch(fetchTags());
    })();
  }, [dispatch]);

  const hanleStarSelectGroup = React.useCallback(
    (group: IGroupModel) => {
      // dispatch(selectedItemSlice.actions.starSelectGroup({ group }));
      // dispatch(fetchStarsByGroup({ groupId: group.id }));
    },
    [dispatch],
  );

  const hanleGistSelectGroup = React.useCallback(
    (group: IGroupModel) => {
      // dispatch(selectedItemSlice.actions.gistSelectGroup({ group }));
      // dispatch(getGistListByGroup({ groupId: group.id }));
    },
    [dispatch],
  );

  const handleStarSelectTag = React.useCallback(
    (tag: ITagModel) => {
      // dispatch(selectedItemSlice.actions.starSelectTag({ tag }));
      // dispatch(fetchStarsByTag({ tagId: tag.id }));
    },
    [dispatch],
  );

  const handleGistSelectTag = React.useCallback(
    (tag: ITagModel) => {
      // dispatch(selectedItemSlice.actions.gistSelectTag({ tag }));
      // dispatch(getGistListByTag({ tagId: tag.id }));
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
      <div>
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
          <Tabs value={activeTab} onValueChange={handleTabValueChange}>
            <Box>
              <TabsList className="w-full bg-transparent">
                {TABS.map((tab) => {
                  return (
                    <TabsTrigger
                      key={tab.type}
                      value={tab.type}
                      className="flex-1 rounded-none border-x-0 border-t-0 border-b-2 border-b-transparent text-muted-foreground shadow-none data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
                    >
                      {tab.title}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Box>

            <TabsContent value="STAR">
              <Box style={{ paddingBottom: 30 }}>
                <Group groups={groups} type="STAR" count="starCount" selectGroup={hanleStarSelectGroup} />
                <Tag tags={tags} type="STAR" count="starCount" selectTag={handleStarSelectTag} />
              </Box>
            </TabsContent>

            <TabsContent value="GIST">
              <Box style={{ paddingBottom: 30 }}>
                <Group groups={groups} type="GIST" count="gistCount" selectGroup={hanleGistSelectGroup} />
                <Tag tags={tags} type="GIST" count="gistCount" selectTag={handleGistSelectTag} />
              </Box>
            </TabsContent>
          </Tabs>
        </Box>

        {/* <Stack
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
        </Stack> */}
      </div>

      {/* <Settings />

      <Outlet /> */}
    </div>
  );
};

export default SideBar;
