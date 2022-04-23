import Mid from '@/options/components/mid';
import { getGistListByGroup, getGistListByTag } from '@/options/slices/gistSlice';
import { fetchGroups } from '@/options/slices/groupSlice';
import { selectorItem } from '@/options/slices/selectedItemSlice';
import { selectedStarSlice, selectorStar } from '@/options/slices/selectedStar';
import { fetchStarsByGroup, fetchStarsByTag, IListState, starsSlice } from '@/options/slices/starsSlice';
import { AppDispatch } from '@/options/store';
import { addGist, getGistsListByGroup, getGistsListByTag } from '@/services/idb/gist';
import { addGJT, deleteGJT } from '@/services/idb/gistsJTags';
import { addStar } from '@/services/idb/stars';
import { addSJT, deleteSJT } from '@/services/idb/starsJTags';
import { addTagWithGid, addTagWithSid } from '@/services/idb/tag';
import CodeOffRoundedIcon from '@mui/icons-material/CodeOffRounded';
import { Link, Stack, TextField } from '@mui/material';
import classNames from 'classnames';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowSize } from 'react-use';
import { FixedSizeList } from 'react-window';
import OpenInNewTwoToneIcon from '@mui/icons-material/OpenInNewTwoTone';
import { IStar } from '@/common/api';
import { Box } from '@mui/system';
import Search from '@/options/components/search';

const StarRow = ({ data, index, style }) => {
  const dispatch: AppDispatch = useDispatch();
  const star: IStar = data[index];
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
      dispatch(fetchStarsByGroup({ groupId: selectedItem.group.id }));
    } else {
      dispatch(fetchStarsByTag({ tagId: selectedItem.tag.id }));
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
      <Stack component="h2" direction="row" alignItems="center">
        <span>{star.fullName}</span>
        <a
          href={star.htmlUrl}
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
      dispatch(getGistListByGroup({ groupId: selectedItem.group.id }));
    } else {
      dispatch(getGistListByTag({ tagId: selectedItem.tag.id }));
    }
  };

  return (
    <div key={gist.id} className="star" style={style}>
      <Stack component="h2" direction="row" alignItems="center">
        <span>{gist.description}</span>
        <a
          href={gist.htmlUrl}
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

const MidList: React.FC<{ content: IListState }> = (props) => {
  const { height } = useWindowSize();
  const selectedItem = useSelector(selectorItem);
  const { content } = props;
  const dispatch = useDispatch();
  const BOX_HEIGHT = 60;

  const handleSearchStars = (fullName: string) => {
    if (selectedItem.active === 'GROUP') {
      dispatch(fetchStarsByGroup({ groupId: selectedItem.group.id, description: fullName }));
    } else {
      dispatch(fetchStarsByTag({ tagId: selectedItem.tag.id, fullName }));
    }
  };

  const handleSearchGists = (fullName: string) => {
    if (selectedItem.active === 'GROUP') {
      dispatch(getGistListByGroup({ groupId: selectedItem.group.id, description: fullName }));
    } else {
      dispatch(getGistListByTag({ tagId: selectedItem.tag.id, fullName }));
    }
  };

  return (
    <div className="star-list">
      {selectedItem.active && selectedItem.type === 'STAR' && (
        <Search
          height={BOX_HEIGHT}
          placeholder="search star..."
          onSearch={(keyword) => {
            handleSearchStars(keyword);
          }}
        />
      )}

      {selectedItem.active && selectedItem.type === 'GIST' && (
        <Search
          height={BOX_HEIGHT}
          placeholder="search gist..."
          onSearch={(keyword) => {
            handleSearchGists(keyword);
          }}
        />
      )}

      {content.data.length !== 0 ? (
        <FixedSizeList
          itemData={content.data}
          height={height - BOX_HEIGHT}
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
