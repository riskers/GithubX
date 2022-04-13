import { getGistList } from '@/options/slices/gistSlice';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const Gist = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getGistList());
  }, [dispatch]);

  return <div>gist</div>;
};

export default Gist;
