import Main from '@/options/components/main';
import SideBar from '@/options/components/sidebar';
import StarList from '@/options/components/star-list';
import Settings from '@/options/components/setting';
import * as React from 'react';
import { LinearProgress, Stack } from '@mui/material';

const Home = () => {
  return (
    <>
      <SideBar />
      <StarList />
      <Main />
      <Settings />
    </>
  );
};

export default Home;
