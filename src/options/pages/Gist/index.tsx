import { getGistList } from '@/options/slices/gistSlice';
import { DEFAULT_GROUP } from '@/services/idb/group';
import * as React from 'react';
import { useDispatch } from 'react-redux';

const Gist = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getGistList(DEFAULT_GROUP.id));
  }, [dispatch]);

  return <div>gist</div>;
};

export default Gist;
