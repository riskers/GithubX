import GistRow from '@/options/components/mid-list/components/gist-row';
import StarRow from '@/options/components/mid-list/components/star-row';
import Search from '@/options/components/search';
import { getGistListByGroup, getGistListByTag } from '@/options/slices/gistSlice';
import { selectorItem } from '@/options/slices/selectedItemSlice';
import { fetchStarsByGroup, fetchStarsByTag, IListState } from '@/options/slices/starsSlice';
import CodeOffRoundedIcon from '@mui/icons-material/CodeOffRounded';
import { Stack } from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowSize } from 'react-use';
import { FixedSizeList } from 'react-window';

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
