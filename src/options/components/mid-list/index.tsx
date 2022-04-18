import Mid from '@/options/components/mid';
import { fetchGroups } from '@/options/slices/groupSlice';
import { selectorItem } from '@/options/slices/selectedItemSlice';
import { getGistListByGroup, getGistListByTag } from '@/options/slices/gistSlice';
import { selectedStarSlice, selectorStar } from '@/options/slices/selectedStar';
import { fetchStarsByGroup, fetchStarsByTag, IListState } from '@/options/slices/starsSlice';
import { AppDispatch } from '@/options/store';
import { addGist } from '@/services/idb/gist';
import { addGJT, deleteGJT } from '@/services/idb/gistsJTags';
import { addStar } from '@/services/idb/stars';
import { addSJT, deleteSJT } from '@/services/idb/starsJTags';
import { addTagWithGid, addTagWithSid } from '@/services/idb/tag';
import CodeOffRoundedIcon from '@mui/icons-material/CodeOffRounded';
import { Link, Stack } from '@mui/material';
import classNames from 'classnames';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowSize } from 'react-use';
import { FixedSizeList } from 'react-window';

const StarRow = ({ data, index, style }) => {
  const dispatch: AppDispatch = useDispatch();
  const star = data[index];
  const selectedStar = useSelector(selectorStar);
  const selectedItem = useSelector(selectorItem);

  const addItemInGroup = React.useCallback(async (newStar) => {
    await addStar(newStar);
  }, []);

  const addTag = React.useCallback(async (tagName: string, itemId) => {
    await addTagWithSid(tagName, itemId);
  }, []);

  const selectTag = React.useCallback(async (tagId, itemId) => {
    await addSJT(tagId, itemId);
  }, []);

  const deleteTag = React.useCallback(async (tagId, itemId) => {
    await deleteSJT(tagId, itemId);
  }, []);

  const handleChangeGroup = (groupId) => {
    dispatch(fetchStarsByGroup(groupId));
    dispatch(fetchGroups());
  };

  const handleChangeTag = () => {
    if (selectedItem.active === 'GROUP') {
      dispatch(fetchStarsByGroup(selectedItem.group.id));
    } else {
      dispatch(fetchStarsByTag(selectedItem.tag.id));
    }
  };

  return (
    <div
      key={star.id}
      className={classNames('star', {
        selected: selectedStar.id === star.id,
      })}
      style={style}
      onClick={() => {
        dispatch(selectedStarSlice.actions.selectStar(star));
      }}
    >
      <h2>{star.fullName}</h2>

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

const GistRow = ({ data, index, style }) => {
  const dispatch: AppDispatch = useDispatch();
  const gist = data[index];
  const selectedItem = useSelector(selectorItem);

  const addInGroup = React.useCallback(async (newGist) => {
    await addGist(newGist);
  }, []);

  const addTag = React.useCallback(async (tagName: string, itemId) => {
    await addTagWithGid(tagName, itemId);
  }, []);

  const selectTag = React.useCallback(async (tagId, itemId) => {
    await addGJT(tagId, itemId);
  }, []);

  const deleteTag = React.useCallback(async (tagId, itemId) => {
    await deleteGJT(tagId, itemId);
  }, []);

  const handleChangeGroup = (groupId) => {
    dispatch(getGistListByGroup(groupId));
    dispatch(fetchGroups());
  };

  const handleChangeTag = () => {
    if (selectedItem.active === 'GROUP') {
      dispatch(getGistListByGroup(selectedItem.group.id));
    } else {
      dispatch(getGistListByTag(selectedItem.tag.id));
    }
  };

  return (
    <div key={gist.id} className="star" style={style}>
      <Link target="_blank" href={gist.htmlUrl} underline="none">
        <h2>{gist.description}</h2>
      </Link>

      <div
        className="edit-area"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Mid
          item={gist}
          addItemInGroup={addInGroup}
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

interface IProps {
  content: IListState;
}

const MidList: React.FC<IProps> = (props) => {
  const { height } = useWindowSize();
  const selectedItem = useSelector(selectorItem);
  const { content } = props;

  return (
    <div className="star-list">
      {content.data.length !== 0 ? (
        <FixedSizeList
          itemData={content.data}
          height={height}
          width="100%"
          itemSize={190}
          itemCount={content.data.length}
        >
          {selectedItem.type === 'STAR' ? StarRow : GistRow}
        </FixedSizeList>
      ) : (
        <Stack justifyContent="center" alignItems="center" style={{ fontSize: 20, padding: 30, color: '#c5d2dd' }}>
          <CodeOffRoundedIcon sx={{ fontSize: 60 }} />
        </Stack>
      )}
    </div>
  );
};

export default MidList;
