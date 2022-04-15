import Accordion from '@/options/components/accordion';
import { selectedItemSlice, selectorItem } from '@/options/slices/selectedItemSlice';
import { ITagState } from '@/options/slices/tagSlice';
import { Chip, Stack } from '@mui/material';
import classNames from 'classnames';
import * as React from 'react';
import SellIcon from '@mui/icons-material/Sell';
import { useSelector } from 'react-redux';
import EditTag from '@/options/components/edit-tag';
import { ITag } from '@/services/idb/tag';

interface IProps {
  tags: ITagState;
  count: 'starCount' | 'gistCount';
  selectTag: (tag: ITag) => void;
}

const Tag: React.FC<IProps> = (props) => {
  const { tags, count, selectTag } = props;
  const selectedItem = useSelector(selectorItem);

  return (
    <Accordion title="TAGS" open>
      {tags.data?.map((tag) => {
        return (
          <Stack
            key={tag.id}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            style={{ padding: '0 13px' }}
            className="group-container"
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              style={{ flex: 1 }}
              className={classNames({
                group: true,
                selected: tag.id === selectedItem.tag?.id,
              })}
              onClick={() => {
                selectTag(tag);
              }}
            >
              <SellIcon fontSize="small" />
              <div style={{ paddingLeft: 5 }}>{tag.name}</div>
            </Stack>

            <Chip
              className="star-number"
              size="small"
              label={tag[count]}
              sx={{
                [`&`]: {
                  background: 'rgba(255,255,255, 0.1)',
                  color: '#FFF',
                },
              }}
            />

            <EditTag tag={tag} />
          </Stack>
        );
      })}
    </Accordion>
  );
};

export default Tag;
