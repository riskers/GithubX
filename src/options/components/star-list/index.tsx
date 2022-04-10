import { IStar } from '@/common/api';
import Star from '@/options/components/star';
import { DEFAULT_SELECTED_ITEM, selectorItem } from '@/options/slices/selectedItemSlice';
import { selectedStarSlice, selectorStar } from '@/options/slices/selectedStar';
import { fetchStarsByGroup, fetchStarsByTag } from '@/options/slices/starsSlice';
import { AppDispatch, RootState } from '@/options/store';
import CodeOffRoundedIcon from '@mui/icons-material/CodeOffRounded';
import { Stack } from '@mui/material';
import classNames from 'classnames';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const StarList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const stars = useSelector((state: RootState) => state.stars);
  const selectedItem = useSelector(selectorItem);
  const selectedStar = useSelector(selectorStar);

  const isDefaultGroup = React.useMemo(() => {
    if (selectedItem.group.id === DEFAULT_SELECTED_ITEM.group.id) return true;
    return false;
  }, [selectedItem.group.id]);

  const isDefaultTag = React.useMemo(() => {
    if (selectedItem.tag.id === DEFAULT_SELECTED_ITEM.tag.id) return true;
    return false;
  }, [selectedItem.tag.id]);

  React.useEffect(() => {
    (async () => {
      if (isDefaultGroup) return;
      dispatch(fetchStarsByGroup(selectedItem.group.id));
    })();
  }, [selectedItem.group.id, isDefaultGroup, dispatch]);

  React.useEffect(() => {
    (async () => {
      if (isDefaultTag) return;
      dispatch(fetchStarsByTag(selectedItem.tag.id));
    })();
  }, [selectedItem.tag.id, isDefaultTag, dispatch]);

  return (
    <div className="star-list">
      {stars.data.length !== 0 ? (
        stars.data?.map((star: IStar) => {
          return (
            <div
              key={star.id}
              className={classNames('star', {
                selected: selectedStar.id === star.id,
              })}
              onClick={() => {
                dispatch(selectedStarSlice.actions.selectStar(star));
              }}
            >
              <div>
                <h2>{star.fullName}</h2>
              </div>

              <div
                className="edit-area"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Star star={star} />
              </div>
            </div>
          );
        })
      ) : (
        <Stack justifyContent="center" alignItems="center" style={{ fontSize: 20, padding: 30, color: '#c5d2dd' }}>
          <CodeOffRoundedIcon sx={{ fontSize: 60 }} />
        </Stack>
      )}
    </div>
  );
};

export default React.memo(StarList);
