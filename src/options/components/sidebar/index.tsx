import { addGroup, getGroupList, IGroup } from '@/content_script/services/local/group';
import { getAllStarList } from '@/content_script/services/local/stars';
import { AppContext } from '@/options';
import EditGroup from '@/options/components/edit-group';
import AddIcon from '@mui/icons-material/Add';
import { Button, Chip, Divider, Stack, TextField, Typography } from '@mui/material';
import classNames from 'classnames';
import * as React from 'react';

const SideBar = () => {
  const [openNewGroup, setOpenNewGroup] = React.useState<boolean>(false);
  const [newGroup, setNewGroup] = React.useState<string>('');
  const { groupList, selectGroup, setGroupList, setSelectGroup } = React.useContext(AppContext);
  const ref = React.useRef(null);

  const fetchGroupList = React.useCallback(() => {
    (async () => {
      const list = await getGroupList();
      setGroupList(list);
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      if (!newGroup) return;

      await addGroup(newGroup);

      fetchGroupList();
    })();
  }, [newGroup]);

  React.useEffect(() => {
    fetchGroupList();
  }, []);

  return (
    <div className="sidebar">
      <Typography
        sx={{
          fontSize: 14,
          color: '#606f7b',
          padding: '15px',
        }}
      >
        GROUPS
      </Typography>

      {groupList?.map((group) => {
        return (
          <Stack
            key={group.id}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            style={{ padding: '0 10px' }}
            className="group-container"
          >
            <div
              style={{ flex: 1 }}
              className={classNames({
                group: true,
                selected: group.id === selectGroup?.id,
              })}
              onClick={() => {
                setSelectGroup(group);
              }}
            >
              {group.name}
            </div>

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

      <Typography
        sx={{
          fontSize: 14,
          color: '#606f7b',
          padding: '15px',
        }}
      >
        TAGS
      </Typography>
    </div>
  );
};

export default SideBar;
