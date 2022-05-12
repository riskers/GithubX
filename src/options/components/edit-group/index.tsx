import { fetchGroups } from '@/options/slices/groupSlice';
import styled from '@emotion/styled';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { Button, IconButton, Popover, Stack, TextField } from '@mui/material';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { selectedItemSlice } from '@/options/slices/selectedItemSlice';
import { groupInstace, IGroupModal } from '@/services/groupInstance';
import { DEFAULT_GROUP } from '@/services/idb/group';

const SmallButton = styled(Button)(() => {
  return {
    [`&`]: {
      height: 24,
      fontSize: 14,
    },
  };
});

const EditGroup = (props: Pick<IGroupModal, 'id' | 'name'>) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const ref = React.useRef(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = async () => {
    await groupInstace.updateGroup(props.id, ref.current.value);
    dispatch(fetchGroups());
  };

  const handleDelete = async () => {
    await groupInstace.deleteGroup(props.id);
    dispatch(selectedItemSlice.actions.starSelectGroup({ group: DEFAULT_GROUP }));
    dispatch(fetchGroups());
  };

  return (
    <div className="edit-group">
      <IconButton
        onClick={handleOpen}
        aria-label="edit"
        size="small"
        sx={{
          color: '#cdcdcd',
        }}
      >
        <MoreHorizRoundedIcon />
      </IconButton>

      <Popover
        id={props.id.toString()}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handleClose}
      >
        <Stack spacing={2} style={{ padding: 10, background: '#FFF', borderRadius: 10 }}>
          <TextField
            fullWidth
            size="small"
            defaultValue={props.name}
            inputRef={ref}
            onKeyPress={async (e) => {
              if (e.key === 'Enter') {
                await handleUpdate();
                handleClose();
              }
            }}
          />
          <SmallButton
            variant="contained"
            size="small"
            fullWidth
            onClick={async () => {
              await handleUpdate();
              handleClose();
            }}
          >
            {chrome.i18n.getMessage('save')}
          </SmallButton>
          <SmallButton
            variant="contained"
            size="small"
            color="error"
            fullWidth
            onClick={async () => {
              await handleDelete();
              handleClose();
            }}
          >
            {chrome.i18n.getMessage('delete')}
          </SmallButton>
        </Stack>
      </Popover>
    </div>
  );
};

export default React.memo(EditGroup);
