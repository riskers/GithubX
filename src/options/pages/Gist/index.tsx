import MidList from '@/options/components/mid-list';
import { getGistList } from '@/options/slices/gistSlice';
import { RootState } from '@/options/store';
import { DEFAULT_GROUP } from '@/services/idb/group';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Gist = () => {
  const dispatch = useDispatch();
  const gists = useSelector((state: RootState) => state.gists);

  // React.useEffect(() => {
  //   dispatch(getGistList(DEFAULT_GROUP.id));
  // }, [dispatch]);

  return (
    <div>
      <MidList content={gists} />
    </div>
  );
};

export default Gist;
