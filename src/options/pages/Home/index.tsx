import Main from '@/options/components/main';
import SideBar from '@/options/components/sidebar';
import StarList from '@/options/components/star-list';
import Settings from '@/options/components/user';
import * as React from 'react';

const Home = () => {
  return (
    <>
      <StarList />
      <Main />
      <Settings />
    </>
  );
};

export default Home;
