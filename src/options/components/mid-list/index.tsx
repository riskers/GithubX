import Mid from '@/options/components/mid';
import Search from '@/options/components/search';
import { getGistListByGroup, getGistListByTag } from '@/options/slices/gistSlice';
import { fetchGroups } from '@/options/slices/groupSlice';
import { selectorItem } from '@/options/slices/selectedItemSlice';
import { selectedStarSlice, selectorStar } from '@/options/slices/selectedStar';
import { fetchStarsByGroup, fetchStarsByTag, IListState } from '@/options/slices/starsSlice';
import { AppDispatch } from '@/options/store';
import { AS } from '@/services';
import { IStarModel } from '@/services/model/star';
import CodeOffRoundedIcon from '@mui/icons-material/CodeOffRounded';
import OpenInNewTwoToneIcon from '@mui/icons-material/OpenInNewTwoTone';
import { Stack } from '@mui/material';
import classNames from 'classnames';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowSize } from 'react-use';
import { FixedSizeList } from 'react-window';

const StarRow = ({ data, index, style }) => {
  const dispatch: AppDispatch = useDispatch();
  const star: IStarModel = data[index];
  const selectedStar = useSelector(selectorStar);
  const selectedItem = useSelector(selectorItem);

  const addItemInGroup = React.useCallback(async (newStar) => {
    await AS.star.addStar(newStar);
  }, []);

  const addTag = React.useCallback(async (tagName: string, itemId) => {
    await AS.tag.addTagWithSid(tagName, itemId);
  }, []);

  const selectTag = React.useCallback(async (tagId, itemId) => {
    await AS.sjt.addSJT(tagId, itemId);
  }, []);

  const deleteTag = React.useCallback(async (tagId, itemId) => {
    await AS.sjt.deleteSJT(tagId, itemId);
  }, []);

  const handleChangeGroup = (groupId) => {
    dispatch(fetchStarsByGroup({ groupId }));
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
    await AS.gist.addGist(newGist);
  }, []);

  const addTag = React.useCallback(async (tagName: string, itemId) => {
    await AS.tag.addTagWithGid(tagName, itemId);
  }, []);

  const selectTag = React.useCallback(async (tagId, itemId) => {
    await AS.gjt.addGJT(tagId, itemId);
  }, []);

  const deleteTag = React.useCallback(async (tagId, itemId) => {
    await AS.gjt.deleteGJT(tagId, itemId);
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

  const handleSearchStars = React.useCallback(
    (fullName: string) => {
      if (selectedItem.active === 'GROUP') {
        dispatch(fetchStarsByGroup({ groupId: selectedItem.group.id, description: fullName }));
      } else {
        dispatch(fetchStarsByTag({ tagId: selectedItem.tag.id, fullName }));
      }
    },
    [selectedItem.group.id, selectedItem.tag.id, dispatch, selectedItem.active],
  );

  const handleSearchGists = React.useCallback(
    (fullName: string) => {
      if (selectedItem.active === 'GROUP') {
        dispatch(getGistListByGroup({ groupId: selectedItem.group.id, description: fullName }));
      } else {
        dispatch(getGistListByTag({ tagId: selectedItem.tag.id, fullName }));
      }
    },
    [selectedItem.group.id, selectedItem.tag.id, selectedItem.active, dispatch],
  );

  const showSearchStar = React.useMemo(() => {
    if (selectedItem.type === 'STAR') {
      if (selectedItem.active === 'GROUP') return selectedItem.group.id > -1;
      if (selectedItem.active === 'TAG') return selectedItem.tag.id > -1;
    }
  }, [selectedItem]);

  const showSearchGist = React.useMemo(() => {
    if (selectedItem.type === 'GIST') {
      if (selectedItem.active === 'GROUP') return selectedItem.group.id > -1;
      if (selectedItem.active === 'TAG') return selectedItem.tag.id > -1;
    }
  }, [selectedItem]);

  return (
    <div className="star-list">
      {showSearchStar && <Search height={BOX_HEIGHT} placeholder="search star..." onSearch={handleSearchStars} />}

      {showSearchGist && <Search height={BOX_HEIGHT} placeholder="search gist..." onSearch={handleSearchGists} />}

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
