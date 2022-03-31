import { addGroup } from '@/content_script/services/local/group';
import { getTagsList } from '@/content_script/services/local/tag';
import { AppContext } from '@/options';
import Accordion from '@/options/components/accordion';
import EditGroup from '@/options/components/edit-group';
import EditTag from '@/options/components/edit-tag';
import { fetchGroups } from '@/options/pages/Home/slices/groupSlice';
import { selectedSlice, selectorGroup } from '@/options/pages/Home/slices/selectedSlice';
import { RootState } from '@/options/store';
import AddIcon from '@mui/icons-material/Add';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import RefreshIcon from '@mui/icons-material/Refresh';
import SellIcon from '@mui/icons-material/Sell';
import { Button, Chip, Divider, Stack, TextField } from '@mui/material';
import classNames from 'classnames';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SideBar = () => {
  const [openNewGroup, setOpenNewGroup] = React.useState<boolean>(false);
  const [newGroup, setNewGroup] = React.useState<string>('');
  const { groupList, tagsList, selectTag, setGroupList, setTagsList, setSelectGroup, setSelectTag } =
    React.useContext(AppContext);
  const ref = React.useRef(null);

  const dispatch = useDispatch();
  const selectedGroup = useSelector(selectorGroup);

  const groups = useSelector((state: RootState) => state.groups);

  const fetchData = React.useCallback(() => {
    (async () => {
      dispatch(fetchGroups());

      let tlist = await getTagsList();
      // setTagsList(tlist);
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      if (!newGroup) return;

      await addGroup(newGroup);

      fetchData();
    })();
  }, [newGroup]);

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="sidebar">
      <Stack direction="row" justifyContent="space-between" alignItems="center" style={{ padding: '13px' }}>
        <Stack>STARS</Stack>
        <Button>
          <RefreshIcon />
        </Button>
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
                  selected: group.id === selectedGroup?.id,
                })}
                onClick={() => {
                  dispatch(selectedSlice.actions.selectGroup(group));
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

              <EditGroup group={group} />
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

                const isRepeat = groupList.some((group) => group.name === groupName);

                // input is not null and not repeat in groupList
                if (groupName.trim() && !isRepeat) {
                  setNewGroup(groupName);
                  ref.current.value = '';
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

      <Divider />

      <Accordion title="TAGS" open>
        {tagsList?.map((tag) => {
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
                  selected: tag.id === selectTag?.id,
                })}
                onClick={() => {
                  setSelectTag(tag);
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
  );
};

export default SideBar;
