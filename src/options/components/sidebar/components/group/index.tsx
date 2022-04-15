import Accordion from '@/options/components/accordion';
import EditGroup from '@/options/components/edit-group';
import { fetchGroups, IGroupState } from '@/options/slices/groupSlice';
import { selectorItem } from '@/options/slices/selectedItemSlice';
import { addGroup, IGroup } from '@/services/idb/group';
import AddIcon from '@mui/icons-material/Add';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import { Button, Chip, Stack, TextField } from '@mui/material';
import classNames from 'classnames';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface IProps {
  groups: IGroupState;
  count: 'starCount' | 'gistCount';
  selectGroup: (group: IGroup) => void;
}

const Group: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const ref = React.useRef(null);
  const [openNewGroup, setOpenNewGroup] = React.useState<boolean>(false);
  const { groups, count, selectGroup } = props;
  const selectedItem = useSelector(selectorItem);

  return (
    <>
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
                  selectGroup(group);
                }}
              >
                <AllInboxIcon fontSize="small" />
                <div style={{ paddingLeft: 5 }}>{group.name}</div>
              </Stack>

              <Chip
                className="star-number"
                size="small"
                label={group[count]}
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
    </>
  );
};

export default React.memo(Group);
