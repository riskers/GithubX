import Accordion from '@/options/components/accordion';
import EditGroup from '@/options/components/edit-group';
import { fetchGroups, IGroupState } from '@/options/slices/groupSlice';
import { NotifySlice } from '@/options/slices/notifySlice';
import { selectorItem } from '@/options/slices/selectedItemSlice';
import { AS } from '@/services';
import { IGroupModel } from '@/services/model/group';
import AddIcon from '@mui/icons-material/Add';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import { Button, Chip, Stack, TextField } from '@mui/material';
import classNames from 'classnames';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface IProps {
  groups: IGroupState;
  count: 'starCount' | 'gistCount';
  type: 'STAR' | 'GIST';
  selectGroup: (group: IGroupModel) => void;
}

const Group: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const ref = React.useRef(null);
  const [openNewGroup, setOpenNewGroup] = React.useState<boolean>(false);
  const { groups, count, type, selectGroup } = props;
  const selectedItem = useSelector(selectorItem);

  return (
    <>
      <Accordion title={chrome.i18n.getMessage('groups')} open>
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
                  selected: group.id === selectedItem.group.id && type === selectedItem.type,
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
            label={chrome.i18n.getMessage('enter_group_name')}
            autoFocus
            defaultValue=""
            onBlur={() => {
              setOpenNewGroup(false);
            }}
            onKeyPress={async (e) => {
              if (e.key === 'Enter') {
                const groupName = ref.current.value;

                const isRepeat = groups.data.some((group) => group.name === groupName);

                if (isRepeat) {
                  dispatch(NotifySlice.actions.open({ message: 'repeat group name' }));
                }

                // input is not null and not repeat in groupList
                if (groupName.trim() && !isRepeat) {
                  await AS.group.addGroup(groupName);
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
            {chrome.i18n.getMessage('add_group')}
          </Button>
        )}
      </div>
    </>
  );
};

export default Group;
