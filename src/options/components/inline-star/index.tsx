import { IStar } from '@/common/api';
import { AppContext } from '@/options';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Fab, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import * as React from 'react';
import './style.css';

interface IProps {
  star: IStar;
}

const InlineStar = (props: IProps) => {
  const app = React.useContext(AppContext);

  return (
    <div
      className="star"
      onClick={(e) => {
        app.setUrl(props.star.htmlUrl);
        app.setFullName(props.star.fullName);
      }}
    >
      <span style={{ marginRight: 20 }}>{props.star.fullName}</span>

      <Button
        style={{ marginLeft: 10, position: 'absolute', bottom: 0, right: 1 }}
        aria-label="edit"
        color="success"
        size="small"
        variant="outlined"
        endIcon={<EditIcon />}
        onClick={(e) => {
          // e.preventDefault();
        }}
      >
        edit
      </Button>
    </div>
  );
};

export default InlineStar;
