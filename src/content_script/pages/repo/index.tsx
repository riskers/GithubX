import { IIntercepotAddStar, IInterceptStar } from '@/background/network';
import ChromeMessageHook from '@/content_script/hooks/oneway-message';
import {
  ACTION_INTERCEPT_NETWORK_GET_INFO,
  ACTION_INTERCEPT_NETWORK_STAR_ADD,
} from '@/content_script/hooks/oneway-message/message';
import { DEFAULT_GROUP } from '@/services/idb/group';
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  OutlinedInput,
  Select,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

const Repo: React.FC = () => {
  // set group id = 0 when did't star this repo before:
  const [groupId, setGroupId] = useState<number>(DEFAULT_GROUP.id);
  const [tagIds, setTagIds] = useState<number[]>([]);
  const [message, sendMessage] = ChromeMessageHook<IInterceptStar>();

  const handleClose = async () => {
    sendMessage({ type: ACTION_INTERCEPT_NETWORK_STAR_ADD });
  };

  console.log(message);

  if (!message) return null;

  const { starInfo, groups, tags } = message.payload;

  return (
    <Dialog onClose={handleClose} open={message?.type === ACTION_INTERCEPT_NETWORK_GET_INFO}>
      <DialogTitle>Group and Tag</DialogTitle>
      <DialogContent sx={{ width: 460 }}>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native-group">
            Group
          </InputLabel>
          <NativeSelect
            id="select-group"
            size="small"
            inputProps={{
              name: 'group',
              id: 'uncontrolled-native-group',
            }}
            defaultValue={groupId}
            onChange={async (event) => {
              const newGroupdId = parseInt(event.target.value, 10);
              setGroupId(newGroupdId);
            }}
          >
            {groups?.map((group) => {
              return (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>

        {tags.length !== 0 && (
          <FormControl fullWidth style={{ marginTop: 15 }}>
            <Select
              inputProps={{
                style: {
                  color: 'red',
                },
              }}
              sx={{
                color: 'success.main',
                '& label': {
                  color: 'red',
                },
              }}
              label="tag"
              multiple
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              value={tagIds}
              onChange={(event) => {
                const value = event.target.value;
                const tids = typeof value === 'string' ? value.split(',') : value;
                setTagIds(tids.map((tid) => parseInt(tid, 10)));
              }}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} color="success" size="small" />
                  ))}
                </Box>
              )}
            >
              {tags?.map((tag) => {
                return (
                  <MenuItem key={tag.id} value={tag.id}>
                    {tag.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          autoFocus
          onClick={async () => {
            console.log(groupId);
            console.log(tagIds);
            // handleClose();

            sendMessage<IIntercepotAddStar>({
              type: ACTION_INTERCEPT_NETWORK_STAR_ADD,
              payload: {
                groupId,
                tagsId: tagIds,
                starInfo: {
                  id: 1,
                  htmlUrl: '',
                  groupId,
                  fullName: '',
                },
              },
            });
          }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Repo;
