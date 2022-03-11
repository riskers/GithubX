import { addGroup, getGroupList, IGroup } from '@/content_script/services/local/group';
import { getTagsList } from '@/content_script/services/local/tag';
import { AppContext } from '@/options';
import Accordion from '@/options/components/accordion';
import EditGroup from '@/options/components/edit-group';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import AddIcon from '@mui/icons-material/Add';
import { Button, Chip, Divider, IconButton, Stack, TextField, Typography } from '@mui/material';
import classNames from 'classnames';
import * as React from 'react';

const SideBar = () => {
  const [openNewGroup, setOpenNewGroup] = React.useState<boolean>(false);
  const [newGroup, setNewGroup] = React.useState<string>('');
  const { groupList, tagsList, selectGroup, selectTag, setGroupList, setTagsList, setSelectGroup, setSelectTag } =
    React.useContext(AppContext);
  const ref = React.useRef(null);

  const fetchData = React.useCallback(() => {
    (async () => {
      let glist = await getGroupList();
      setGroupList(glist);

      let tlist = await getTagsList();
      console.log(tlist);
      setTagsList(tlist);
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
      <Accordion title="GROUPS" open>
        {groupList?.map((group) => {
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
                  selected: group.id === selectGroup?.id,
                })}
                onClick={() => {
                  setSelectGroup(group);
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

      <Accordion title="TAGS" open={false}>
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
              <div
                style={{ flex: 1 }}
                className={classNames({
                  group: true,
                  selected: tag.id === selectTag?.id,
                })}
                onClick={() => {
                  setSelectTag(tag);
                }}
              >
                {tag.name}
              </div>

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

              {/* <EditGroup group={group} /> */}
            </Stack>
          );
        })}
      </Accordion>
    </div>
  );
};

export default SideBar;
