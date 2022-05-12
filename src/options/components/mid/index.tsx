import { fetchTags } from '@/options/slices/tagSlice';
import { RootState } from '@/options/store';
import { IGroupModal } from '@/services/groupInstance';
import { ITagModel } from '@/services/tagInstance';
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

export interface IItem {
  id?: number;
  htmlUrl: string;
  groupId: number;
  createTime?: number;
  updateTime?: number;
  group?: IGroupModal;
  tags?: ITagModel[];
}

interface IProps {
  item: IItem;
  addItemInGroup?: (item: IItem) => void;
  addTag: (tagName: string, itemId: IItem['id']) => void;
  selectTag: (tag: ITagModel['id'], itemId: IItem['id']) => void;
  deleteTag: (tag: ITagModel['id'], itemId: IItem['id']) => void;
  handleChangeGroup: (groupId) => void;
  handleChangeTag: () => void;
}

const Mid = (props: IProps) => {
  const [openEditTag, setOpenEditTag] = React.useState<boolean>(false);
  const [openEditGroup, setOpenEditGroup] = React.useState<boolean>(false);

  const dispatch = useDispatch();
  const groups = useSelector((state: RootState) => state.groups);
  const tags = useSelector((state: RootState) => state.tags);

  const { item, addItemInGroup, addTag, selectTag, deleteTag, handleChangeGroup, handleChangeTag } = props;

  const { data: groupList } = groups;
  const { data: allTagsList } = tags;

  const handleCloseTagEdit = () => {
    setOpenEditTag(false);
  };

  React.useEffect(() => {
    document.addEventListener('click', handleCloseTagEdit, false);
    return () => document.removeEventListener('click', handleCloseTagEdit, false);
  });

  return (
    <div className="edit-repo">
      {openEditTag ? (
        <Autocomplete
          id={`tags-selected-${item.id}`}
          multiple
          disableClearable
          size="small"
          options={allTagsList}
          noOptionsText="Add a tag..."
          value={item.tags}
          freeSolo
          filterSelectedOptions
          onChange={async (
            event,
            v,
            r: AutocompleteChangeReason,
            d: AutocompleteChangeDetails<ITagModel> | AutocompleteChangeDetails<string>,
            // eslint-disable-next-line max-params
          ) => {
            // console.log(v, r, d);

            const itemId = item.id;

            if (r === 'createOption') {
              const option = d.option as string;
              const exist = item.tags.map((tag) => tag.name).some((tagName) => tagName === option);

              if (exist) return;
              await addTag(option, itemId);
            }

            if (r === 'selectOption') {
              const tag = d.option as ITagModel;

              const exist = item.tags.map((tag) => tag.name).some((tagName) => tagName === tag.name);
              if (exist) return;

              await selectTag(tag.id, itemId);
            }

            if (r === 'removeOption') {
              const tag = d.option as ITagModel;
              await deleteTag(tag.id, itemId);
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
          renderTags={(value: ITagModel[], getTagProps) => {
            return value.map((option, index) => {
              return <Chip color="success" label={option.name} key={index} size="small" {...getTagProps({ index })} />;
            });
          }}
          renderInput={(params) => {
            return <TextField {...params} placeholder="Add a tag..." />;
          }}
        />
      ) : (
        <Container
          onClick={() => {
            setOpenEditTag(true);
          }}
          style={{ padding: 0 }}
        >
          {item?.tags?.map((tag) => {
            return (
              <Chip size="small" key={tag.id} label={tag.name} color="primary" clickable style={{ marginRight: 5 }} />
            );
          })}

          <Chip
            size="small"
            label={chrome.i18n.getMessage('edit')}
            clickable
            style={{ background: '#f1f5f8', color: '#606f7b' }}
            className="edit-label"
          />
        </Container>
      )}

      {openEditGroup ? (
        <Select
          id={`select-group-${item.group.id.toString()}`}
          size="small"
          autoWidth
          value={item.group.id.toString()}
          style={{ marginTop: 10 }}
          onChange={async (event: SelectChangeEvent) => {
            const newGroupdId = parseInt(event.target.value, 10);
            const newItem = {
              ...item,
              groupId: newGroupdId,
            };

            setOpenEditGroup(false);

            await addItemInGroup(newItem);
            handleChangeGroup(item.group.id);
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
            label={item.group.name}
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
