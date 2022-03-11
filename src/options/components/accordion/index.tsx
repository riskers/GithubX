import { Button, Container, Stack, Typography } from '@mui/material';
import * as React from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface IProps {
  title: string;
  open: boolean;
  children: React.ReactNode;
}

const Accordion = (props: IProps) => {
  const [expand, setExpand] = React.useState<boolean>(props.open);
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

      {expand && props.children}
      {expand && !props.children && (
        <Container>
          <Stack style={{ color: '#606f7b' }} alignItems="center">
            empty...
          </Stack>
        </Container>
      )}
    </>
  );
};

export default Accordion;
