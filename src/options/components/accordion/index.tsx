import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CodeOffRoundedIcon from '@mui/icons-material/CodeOffRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Container, Stack, Typography } from '@mui/material';
import * as React from 'react';

interface IProps {
  title: string;
  open: boolean;
  children: React.ReactNode[];
}

const Accordion = (props: IProps) => {
  const [expand, setExpand] = React.useState<boolean>(props.open);
  const isEmpty = props.children.length === 0;

  return (
    <>
      <Stack direction="row" style={{ padding: '0 15px' }}>
        <Button
          disableRipple
          disableElevation
          startIcon={expand ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          fullWidth
          style={{ justifyContent: 'start', background: 'none', color: '#606f7b' }}
          onClick={() => {
            setExpand(!expand);
          }}
        >
          <Typography
            sx={{
              // marginLeft: '5px',
              fontSize: 14,
              color: '#606f7b',
            }}
          >
            {props.title}
          </Typography>
        </Button>
      </Stack>

      {expand && !isEmpty && props.children}
      {expand && isEmpty && (
        <Container>
          <Stack style={{ color: '#606f7b' }} alignItems="center">
            <CodeOffRoundedIcon />
          </Stack>
        </Container>
      )}
    </>
  );
};

export default Accordion;
