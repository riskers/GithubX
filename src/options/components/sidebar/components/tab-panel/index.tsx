import { Box } from '@mui/system';
import * as React from 'react';

export const TABS = [
  { title: 'star', index: 0, url: '/' },
  { title: 'gist', index: 1, url: '/gist' },
] as const;

interface IProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: IProps) => {
  return props.index === props.value && <Box>{props.children}</Box>;
};

export default TabPanel;
