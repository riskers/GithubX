import Mid from '@/options/components/mid';
import { getGistListByGroup, getGistListByTag } from '@/options/slices/gistSlice';
import { fetchGroups } from '@/options/slices/groupSlice';
import { selectorItem } from '@/options/slices/selectedItemSlice';
import { AppDispatch, RootState } from '@/options/store';
import { AS } from '@/services';
import OpenInNewTwoToneIcon from '@mui/icons-material/OpenInNewTwoTone';
import { Stack } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const GistRow = ({ data, index, style }) => {
  const dispatch: AppDispatch = useDispatch();
  const gist = data[index];
  const selectedItem = useSelector(selectorItem);
  const { keyword } = useSelector((state: RootState) => state.search);

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
    dispatch(getGistListByGroup({ groupId, description: keyword }));
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

export default GistRow;
