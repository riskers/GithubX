import Mid from '@/entrypoints/options/components/mid';
import { fetchGroups } from '@/entrypoints/options/slices/groupSlice';
import { selectorItem } from '@/entrypoints/options/slices/selectedItemSlice';
import { selectedStarSlice, selectorStar } from '@/entrypoints/options/slices/selectedStar';
import { fetchStarsByGroup, fetchStarsByTag } from '@/entrypoints/options/slices/starsSlice';
import { AppDispatch, RootState } from '@/entrypoints/options/store';
import { AS } from '@/services';
import { IStarModel } from '@/services/model/star';
import OpenInNewTwoToneIcon from '@mui/icons-material/OpenInNewTwoTone';
import { Stack } from '@mui/material';
import classNames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const StarRow = ({ data, index, style }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const star: IStarModel = data[index];
  const selectedStar = useSelector(selectorStar);
  const selectedItem = useSelector(selectorItem);
  const { keyword } = useSelector((state: RootState) => state.search);

  const addItemInGroup = React.useCallback(async (newStar: any) => {
    await AS.star.addStar(newStar);
  }, []);

  const addTag = React.useCallback(async (tagName: string, itemId: any) => {
    await AS.tag.addTagWithSid(tagName, itemId);
  }, []);

  const selectTag = React.useCallback(async (tagId: any, itemId: any) => {
    await AS.sjt.addSJT(tagId, itemId);
  }, []);

  const deleteTag = React.useCallback(async (tagId: any, itemId: any) => {
    await AS.sjt.deleteSJT(tagId, itemId);
  }, []);

  const handleChangeGroup = (groupId: any) => {
    dispatch(fetchStarsByGroup({ groupId, description: keyword }));
    dispatch(fetchGroups());
  };

  const handleChangeTag = () => {
    if (selectedItem.active === 'GROUP') {
      // dispatch(fetchStarsByGroup({ groupId: selectedItem.group.id, description: keyword }));
    } else {
      // dispatch(fetchStarsByTag({ tagId: selectedItem.tag.id, fullName: keyword }));
    }
  };

  return (
    <div
      // key={star.id}
      // className={classNames('star', {
      //   selected: selectedStar.id === star.id,
      // })}
      style={style}
      onClick={() => {
        dispatch(selectedStarSlice.actions.selectStar(star));
      }}
    >
      <Stack component="h2" direction="row" alignItems="center">
        <span>{star.fullName}</span>
        <a
          // href={star.htmlUrl}
          onClick={(e) => {
            e.stopPropagation();
          }}
          target="_blank"
          className="link"
        >
          <OpenInNewTwoToneIcon sx={{ fontSize: 20 }} />
        </a>
      </Stack>

      <div
        className="edit-area"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Mid
          item={star}
          addItemInGroup={addItemInGroup}
          addTag={addTag}
          selectTag={selectTag}
          deleteTag={deleteTag}
          handleChangeGroup={handleChangeGroup}
          handleChangeTag={handleChangeTag}
        />
      </div>
    </div>
  );
};

export default StarRow;
