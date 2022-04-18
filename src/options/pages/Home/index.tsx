import Main from '@/options/components/main';
import MidList from '@/options/components/mid-list';
import { RootState } from '@/options/store';
import * as React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const stars = useSelector((state: RootState) => state.stars);

  return (
    <>
      <MidList content={stars} />
      <Main />
    </>
  );
};

export default Home;
