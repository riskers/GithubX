import Main from '@/options/components/main';
import MidList from '@/options/components/mid-list';
import { DEFAULT_SELECTED_ITEM, selectorItem } from '@/options/slices/selectedItemSlice';
import { fetchStarsByGroup, fetchStarsByTag } from '@/options/slices/starsSlice';
import { RootState } from '@/options/store';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const stars = useSelector((state: RootState) => state.stars);
  const selectedItem = useSelector(selectorItem);

  // const isDefaultGroup = React.useMemo(() => {
  //   if (selectedItem.group.id === DEFAULT_SELECTED_ITEM.group.id) return true;
  //   return false;
  // }, [selectedItem.group.id]);

  // const isDefaultTag = React.useMemo(() => {
  //   if (selectedItem.tag.id === DEFAULT_SELECTED_ITEM.tag.id) return true;
  //   return false;
  // }, [selectedItem.tag.id]);

  // React.useEffect(() => {
  //   (async () => {
  //     if (isDefaultGroup) return;
  //     dispatch(fetchStarsByGroup(selectedItem.group.id));
  //   })();
  // }, [selectedItem.group.id, isDefaultGroup, dispatch]);

  // React.useEffect(() => {
  //   (async () => {
  //     if (isDefaultTag) return;
  //     dispatch(fetchStarsByTag(selectedItem.tag.id));
  //   })();
  // }, [selectedItem.tag.id, isDefaultTag, dispatch]);

  return (
    <>
      <MidList content={stars} />
      <Main />
    </>
  );
};

export default Home;
