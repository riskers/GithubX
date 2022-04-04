import { deleteTag, getTagsList, ITag, updateTag } from '@/services/idb/tag';
import { AppContext } from '@/options';
import { selectorStar } from '@/options/slices/selectedStar';
import { fetchTags } from '@/options/slices/tagSlice';
import styled from '@emotion/styled';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { Button, IconButton, Popover, Stack, TextField } from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface IProps {
  tag: ITag;
}

const SmallButton = styled(Button)(() => {
  return {
    [`&`]: {
      height: 24,
      fontSize: 14,
    },
  };
});

const EditTag: React.FC<IProps> = (props: IProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const dispatch = useDispatch();

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = async (tagName: string) => {
    await updateTag(props.tag.id, { name: tagName });
    dispatch(fetchTags());
  };

  const handleDelete = async () => {
    await deleteTag(props.tag.id);
    dispatch(fetchTags());
  };

  const open = Boolean(anchorEl);
  const ref = React.useRef(null);

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
        id={props.tag.id.toString()}
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
            defaultValue={props.tag.name}
            inputRef={ref}
            onKeyPress={async (e) => {
              if (e.key === 'Enter') {
                await handleUpdate(ref.current.value);
                handleClose();
              }
            }}
          />
          <SmallButton
            variant="contained"
            size="small"
            fullWidth
            onClick={async () => {
              await handleUpdate(ref.current.value);
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
              await handleDelete();
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

export default React.memo(EditTag, (prevProps, nextProps) => {
  if (prevProps.tag.id === nextProps.tag.id) return true;
  return false;
});
