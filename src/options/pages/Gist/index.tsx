import MidList from '@/options/components/mid-list';
import { RootState } from '@/options/store';
import * as React from 'react';
import { useSelector } from 'react-redux';

const Gist = () => {
  const gists = useSelector((state: RootState) => state.gists);

  return (
    <div>
      <MidList content={gists} />
    </div>
  );
};

export default Gist;
