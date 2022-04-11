import Main from '@/options/components/main';
import Settings from '@/options/components/setting';
import StarList from '@/options/components/star-list';
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
