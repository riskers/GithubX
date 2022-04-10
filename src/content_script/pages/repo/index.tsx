import { IIntercepotAddStar, IInterceptStar } from '@/background/network';
import ChromeMessageHook from '@/content_script/hooks/oneway-message';
import { INTERCEPT_GETSTARINFO_B2C, INTERCEPT_STARADD_C2B } from '@/content_script/hooks/oneway-message/message';
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
  /**
   * set group id = 0 when did't star this repo before:
   */
  const [groupId, setGroupId] = useState<number>(DEFAULT_GROUP.id);

  const [tagIds, setTagIds] = useState<number[]>([]);

  const [message, sendMessage] = ChromeMessageHook<IInterceptStar>();

  const open = Boolean(message?.type === INTERCEPT_GETSTARINFO_B2C);

  const addStar = () => {
    sendMessage<IIntercepotAddStar>({
      type: INTERCEPT_STARADD_C2B,
      payload: {
        groupId,
        tagsId: tagIds,
        fullName,
      },
    });
  };

  if (!message) return null;
  if (message.type !== INTERCEPT_GETSTARINFO_B2C) return null;

  const { fullName, groups, tags } = message.payload;

  return (
    <Dialog open={open}>
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
            <InputLabel id="uncontrolled-native-tag">Tag</InputLabel>
            <Select
              labelId="uncontrolled-native-tag"
              variant="outlined"
              multiple
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              value={tagIds}
              onChange={(event) => {
                const value = event.target.value;
                const tids = typeof value === 'string' ? value.split(',') : value;
                setTagIds(tids.map((tid) => parseInt(tid, 10)));
              }}
              renderValue={(selected) => {
                const getTagName = (v: number) => {
                  const z = tags.find((tag) => tag.id === v);
                  return z.name;
                };

                return (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((tagId) => (
                      <Chip key={tagId} label={getTagName(tagId)} color="success" size="small" />
                    ))}
                  </Box>
                );
              }}
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
        <Button
          onClick={() => {
            addStar();
          }}
        >
          Cancel
        </Button>
        <Button
          autoFocus
          onClick={() => {
            addStar();
          }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Repo;
