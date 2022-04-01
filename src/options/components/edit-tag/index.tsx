import { deleteTag, getTagsList, ITag, updateTag } from '@/content_script/services/local/tag';
import { AppContext } from '@/options';
import { selectorStar } from '@/options/pages/Home/slices/selectedStar';
import styled from '@emotion/styled';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { Button, IconButton, Popover, Stack, TextField } from '@mui/material';
import * as React from 'react';
import { useSelector } from 'react-redux';

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
  const { setTagsList } = React.useContext(AppContext);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const starInfo = useSelector(selectorStar);

  const fetchTagList = React.useCallback(() => {
    (async () => {
      // TODO get tags info from api, don't do this
      const list = await getTagsList();
      setTagsList(list);
    })();
  }, []);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = async (tagName: string) => {
    await updateTag(props.tag.id, { name: tagName });
    fetchTagList();
  };

  const open = Boolean(anchorEl);
  const ref = React.useRef(null);

  return (
    <div className="edit-group">
      <IconButton
        aria-describedby={props.tag.id}
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
        id={props.tag.id}
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
              await deleteTag(props.tag.id);
              fetchTagList();
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

export default EditTag;
