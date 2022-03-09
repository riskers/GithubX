import { addGroup, getGroupList, IGroup } from '@/content_script/services/local/group';
import { AppContext } from '@/options';
import AddIcon from '@mui/icons-material/Add';
import { Button, TextField, Typography } from '@mui/material';
import classNames from 'classnames';
import * as React from 'react';

const SideBar = () => {
  const [groupList, setGroupList] = React.useState<IGroup[]>([]);
  const [newGroup, setNewGroup] = React.useState<string>('');
  const { selectGroup, setSelectGroup } = React.useContext(AppContext);
  const ref = React.useRef(null);

  const fetchGroupList = React.useCallback(() => {
    (async () => {
      const groupList = await getGroupList();
      setGroupList(groupList);
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
          <div key={group.id}>
            <div
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
          </div>
        );
      })}

      <div style={{ margin: '20px 15px' }}>
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
          label="your new group name?"
          autoFocus
          defaultValue=""
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

        <Button disableRipple variant="outlined" fullWidth startIcon={<AddIcon />}>
          Create Group
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
