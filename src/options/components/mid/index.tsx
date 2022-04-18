import { IStar } from '@/common/api';
import { fetchGroups } from '@/options/slices/groupSlice';
import { selectorItem } from '@/options/slices/selectedItemSlice';
import { fetchStarsByGroup, fetchStarsByTag } from '@/options/slices/starsSlice';
import { fetchTags } from '@/options/slices/tagSlice';
import { RootState } from '@/options/store';
import { addStar } from '@/services/idb/stars';
import { addSJT, deleteSJT } from '@/services/idb/starsJTags';
import { addTag, ITag } from '@/services/idb/tag';
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Chip,
  Container,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface IProps {
  star: IStar;
}

const Mid = (props: IProps) => {
  const [openEditTag, setOpenEditTag] = React.useState<boolean>(false);
  const [openEditGroup, setOpenEditGroup] = React.useState<boolean>(false);

  const dispatch = useDispatch();
  const groups = useSelector((state: RootState) => state.groups);
  const tags = useSelector((state: RootState) => state.tags);
  const selectedItem = useSelector(selectorItem);

  const { data: groupList } = groups;

  // tags option list
  const { data: allTagsList } = tags;

  const handleChangeGroup = () => {
    dispatch(fetchStarsByGroup(props.star.groupId));
    dispatch(fetchGroups());
  };

  const handleClick = () => {
    setOpenEditTag(false);
  };

  const handleChangeTag = () => {
    if (selectedItem.active === 'GROUP') {
      dispatch(fetchStarsByGroup(selectedItem.group.id));
    } else {
      dispatch(fetchStarsByTag(selectedItem.tag.id));
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClick, false);
    return () => document.removeEventListener('click', handleClick, false);
  });

  return (
    <div className="edit-repo">
      {openEditTag ? (
        <Autocomplete
          id={`tags-selected-${props.star.id}`}
          multiple
          disableClearable
          size="small"
          options={allTagsList}
          noOptionsText="Add a tag..."
          value={props.star.tags}
          freeSolo
          filterSelectedOptions
          onChange={async (
            event,
            v,
            r: AutocompleteChangeReason,
            d: AutocompleteChangeDetails<ITag> | AutocompleteChangeDetails<string>,
            // eslint-disable-next-line max-params
          ) => {
            // console.log(v, r, d);

            const sid = props.star.id;

            if (r === 'createOption') {
              const option = d.option as string;
              const exist = props.star.tags.map((tag) => tag.name).some((tagName) => tagName === option);

              if (exist) return;
              await addTag(option, sid);
            }

            if (r === 'selectOption') {
              const tag = d.option as ITag;

              const exist = props.star.tags.map((tag) => tag.name).some((tagName) => tagName === tag.name);
              if (exist) return;

              await addSJT(tag.id, sid);
            }

            if (r === 'removeOption') {
              const tag = d.option as ITag;
              await deleteSJT(tag.id, sid);
            }

            if (r === 'clear') {
              // console.log('clear');
            }

            if (r === 'blur') {
              // console.log('blur');
            }

            dispatch(fetchTags());
            handleChangeTag();
          }}
          getOptionLabel={(option) => {
            if (typeof option === 'string') {
              return option;
            }

            return option.name;
          }}
          renderTags={(value: ITag[], getTagProps) => {
            return value.map((option, index) => {
              return <Chip color="success" label={option.name} key={index} size="small" {...getTagProps({ index })} />;
            });
          }}
          renderInput={(params) => {
            return <TextField {...params} placeholder="Add a tag..." />;
          }}
        />
      ) : (
        <Container onClick={() => setOpenEditTag(true)} style={{ padding: 0 }}>
          {props.star?.tags?.map((tag) => {
            return (
              <Chip size="small" key={tag.id} label={tag.name} color="primary" clickable style={{ marginRight: 5 }} />
            );
          })}

          <Chip
            size="small"
            label="Edit Tag"
            clickable
            style={{ background: '#f1f5f8', color: '#606f7b' }}
            className="edit-label"
          />
        </Container>
      )}

      {openEditGroup ? (
        <Select
          id={`select-group-${props.star.group.id.toString()}`}
          size="small"
          autoWidth
          value={props.star.group.id.toString()}
          style={{ marginTop: 10 }}
          onChange={async (event: SelectChangeEvent) => {
            const newGroupdId = parseInt(event.target.value, 10);
            const newStar: IStar = {
              ...props.star,
              groupId: newGroupdId,
            };

            setOpenEditGroup(false);

            await addStar(newStar);
            handleChangeGroup();
          }}
        >
          {groupList.map((group) => {
            return (
              <MenuItem key={group.id} value={group.id}>
                {group.name}
              </MenuItem>
            );
          })}
        </Select>
      ) : (
        <Container
          onClick={() => {
            setOpenEditGroup(true);
          }}
          style={{ padding: 0 }}
        >
          <Chip
            size="small"
            label={props.star.group.name}
            color="secondary"
            clickable
            style={{ marginRight: 5, borderRadius: 5, marginTop: 10 }}
          />
        </Container>
      )}
    </div>
  );
};

export default Mid;
