import Mid from '@/options/components/mid';
import { selectorItem } from '@/options/slices/selectedItemSlice';
import { selectedStarSlice, selectorStar } from '@/options/slices/selectedStar';
import { IListState } from '@/options/slices/starsSlice';
import { AppDispatch } from '@/options/store';
import { IGist } from '@/services/idb/gist';
import CodeOffRoundedIcon from '@mui/icons-material/CodeOffRounded';
import { Stack } from '@mui/material';
import classNames from 'classnames';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowSize } from 'react-use';
import { FixedSizeList } from 'react-window';

const StarRow = ({ data, index, style }) => {
  const dispatch: AppDispatch = useDispatch();
  const star = data[index];
  const selectedStar = useSelector(selectorStar);

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
        <Mid star={star} />
      </div>
    </div>
  );
};

const GistRow = ({ data, index, style }) => {
  const gist: IGist = data[index];

  return (
    <a target="_blank" href={gist.htmlUrl} key={gist.id} className="star" style={style}>
      <h2>{gist.description}</h2>

      <div
        className="edit-area"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* <Mid star={gist} /> */}
      </div>
    </a>
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
          itemSize={160}
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
