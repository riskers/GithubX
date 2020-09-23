import Btn from '@/content_script/components/btn';
import { addUser, fetchUser } from '@/content_script/services/user';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import * as React from 'react';
import './style.css';

const User: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [desc, setDesc] = React.useState<string>('');
  const [tags, setTags] = React.useState<string>('');

  React.useEffect(() => {
    const getUserInfo = async () => {
      const res = await fetchUser(window.location.href);
      setDesc(res.desc);
      setTags(res.tags.join());
    };

    getUserInfo();
  }, []);

  return (
    <>
      <Btn
        text="edit"
        onClick={() => {
          setOpen(true);
        }}
      />
      <div className="github-plus-user-desc">{desc}</div>
      <div className="github-plus-user-tags">
        {tags && tags.split(',').map((tag, index) => {
          return <span key={index}>{tag}</span>;
        })}
      </div>

      <Dialog open={open}>
        <DialogTitle>添加备注</DialogTitle>
        <DialogContent>
          <TextField
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            placeholder="神"
            value={desc}
            autoFocus
            margin="dense"
            id="desc"
            label="description"
            type=""
            fullWidth
          />
          <TextField
            onChange={(e) => {
              setTags(e.target.value);
            }}
            placeholder="tags , 分割"
            value={tags}
            autoFocus
            margin="dense"
            id="tags"
            label="tags"
            type=""
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              await addUser({
                desc,
                tags: tags.split(','),
                url: window.location.href,
              });
              setOpen(false);
            }}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default User;
