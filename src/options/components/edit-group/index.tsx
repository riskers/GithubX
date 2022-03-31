import { deleteGroup, getGroupList, IGroup, updateGroup } from '@/content_script/services/local/group';
import { AppContext } from '@/options';
import styled from '@emotion/styled';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { Button, IconButton, Popover, Stack, TextField } from '@mui/material';
import * as React from 'react';

interface IProps {
  group: IGroup;
}

const SmallButton = styled(Button)(() => {
  return {
    [`&`]: {
      height: 24,
      fontSize: 14,
    },
  };
});

const EditGroup = (props: IProps) => {
  const { setGroupList } = React.useContext(AppContext);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const fetchGroupList = React.useCallback(() => {
    (async () => {
      const list = await getGroupList();
      // setGroupList(list);
    })();
  }, []);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = async (groupName: string) => {
    await updateGroup(props.group.id, groupName);
    fetchGroupList();
  };

  const open = Boolean(anchorEl);
  const ref = React.useRef(null);

  return (
    <div className="edit-group">
      <IconButton
        aria-describedby={props.group.id}
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
        id={props.group.id}
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
            defaultValue={props.group.name}
            inputRef={ref}
            onKeyPress={async (e) => {
              if (e.key === 'Enter') {
                handleUpdate(ref.current.value);
                handleClose();
              }
            }}
          />
          <SmallButton
            variant="contained"
            size="small"
            fullWidth
            onClick={async () => {
              handleUpdate(ref.current.value);
              handleClose();
            }}
          >
            Save
          </SmallButton>
          <SmallButton
            variant="contained"
            size="small"
            color="error"
            fullWidth
            onClick={async () => {
              await deleteGroup(props.group.id);
              fetchGroupList();
              handleClose();
            }}
          >
            Delete
          </SmallButton>
        </Stack>
      </Popover>
    </div>
  );
};

export default EditGroup;
