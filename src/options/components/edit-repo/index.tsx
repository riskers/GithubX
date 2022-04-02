import { IStar } from '@/common/api';
import { getGroup, getGroupList, IGroup } from '@/content_script/services/local/group';
import { updateStarGroup } from '@/content_script/services/local/stars';
import { addTag as createTag, getTag, getTagsList, ITag } from '@/content_script/services/local/tag';
import { AppContext } from '@/options';
import { selectorItem } from '@/options/pages/Home/slices/selectedItemSlice';
import { RootState } from '@/options/store';
import EditIcon from '@mui/icons-material/Edit';
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
import { without } from 'lodash';
import * as React from 'react';
import { useSelector } from 'react-redux';

interface IProps {
  star: IStar;
}

const EditRepo = (props: IProps) => {
  const { groupList, setGroupList, tagsList, setTagsList, setStarsList } = React.useContext(AppContext);
  const [openEditTag, setOpenEditTag] = React.useState<boolean>(false);
  const [openEditGroup, setOpenEditGroup] = React.useState<boolean>(false);

  const selectedItem = useSelector(selectorItem);
  const groups = useSelector((state: RootState) => state.groups);

  const { group: selectGroup, tag: selectTag } = selectedItem;
  const { tags, group } = props.star;

  // const [repoGroup, setRepoGroup] = React.useState<IGroup>(selectGroup);
  // const [repoTagsList, setRepoTagsList] = React.useState<ITag[]>([]);

  const updateRepoGroup = async (groupId: string) => {
    const groupInfo = await getGroup(groupId);
    // setRepoGroup(groupInfo);
  };

  // const updateStarList = async () => {
  //   const list = await getStarsListByGroup(selectGroup.id);
  //   const ll = list.filter((star) => star.group.id === selectGroup.id);
  //   setStarsList(ll);
  // };

  const updateRepoTags = async (tagsId: string[]) => {
    const tags = await getTag(tagsId);
    // setRepoTagsList(tags);
  };

  const updateAllGroupList = async () => {
    const groupList = await getGroupList();
    // setGroupList(groupList);
  };

  const updateAllTaglist = async () => {
    const tags = await getTagsList();
    // setTagsList(tags);
  };

  React.useEffect(() => {
    (async () => {
      // await updateRepoTags(props.starTagsId);
      await updateRepoGroup(selectGroup.id);
    })();
  }, []);

  const handleClick = React.useCallback(() => {
    setOpenEditTag(false);
  }, []);

  React.useEffect(() => {
    document.addEventListener('click', handleClick, false);
    return () => document.removeEventListener('click', handleClick, false);
  });

  return (
    <div className="edit-repo">
      {!openEditTag && (
        <Container onClick={() => setOpenEditTag(true)} style={{ padding: 0 }}>
          {props.star.tags.map((tag) => {
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

      {openEditTag && (
        <Autocomplete
          id={`tags-selected-${props.star.id}`}
          multiple
          disableClearable
          size="small"
          options={tagsList}
          noOptionsText="Add a tag..."
          value={tags.map((tag) => tag.id)}
          freeSolo
          filterSelectedOptions
          onChange={async (
            event,
            v,
            r: AutocompleteChangeReason,
            d: AutocompleteChangeDetails<ITag> | AutocompleteChangeDetails<string>,
            // eslint-disable-next-line max-params
          ) => {
            console.log(v, r, d);
            const vlist = tags.map((tag) => tag.id);

            if (r === 'createOption') {
              const tag: ITag = await createTag(d.option as string);
              const newStar: IStar = {
                ...props.star,
                tags: props.star.tags.concat(tag),
              };

              await updateRepoTags(tags.map((tag) => tag.id).concat(tag.id));
              // await updateStar(newStar);
              await updateAllTaglist();
            }

            if (r === 'selectOption') {
              const tag = d.option as ITag;
              await updateRepoTags(tags.map((tag) => tag.id).concat(tag.id));

              const newStar: IStar = {
                ...props.star,
                // tags: vlist.concat(tag.id),
              };
              // await updateStar(newStar);
              await updateAllTaglist();
            }

            if (r === 'removeOption') {
              const tag = d.option as ITag;

              const excludeTagIds = without(vlist, tag.id);
              console.log(excludeTagIds);

              await updateRepoTags(excludeTagIds);

              const newStar: IStar = {
                ...props.star,
                // tagsId: excludeTagIds,
              };
              // await updateStar(newStar);
              await updateAllTaglist();
            }

            if (r === 'clear') {
              // console.log('clear');
            }

            if (r === 'blur') {
              // console.log('blur');
            }
          }}
          getOptionLabel={(option) => {
            if (typeof option === 'string') {
              return option;
            }

            return option.name;
          }}
          renderTags={(value: ITag[], getTagProps) => {
            console.log('renderTags', value);
            return value.map((option, index) => {
              console.log(option);
              return (
                <Chip color="success" label={tags[index].name} key={index} size="small" {...getTagProps({ index })} />
              );
            });
          }}
          renderInput={(params) => {
            return <TextField {...params} placeholder="Add a tag..." />;
          }}
        />
      )}

      {!openEditGroup && (
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
            icon={<EditIcon />}
            clickable
            style={{ marginRight: 5, borderRadius: 5, marginTop: 10 }}
          />
        </Container>
      )}

      {openEditGroup && (
        <Select
          id={`${props.star.group.id}`}
          size="small"
          autoWidth
          value={group.id}
          style={{ marginTop: 10 }}
          onChange={async (event: SelectChangeEvent) => {
            const newGroupId = event.target.value;
            const newGroupName = groups.data.filter((group) => group.id === newGroupId)[0].name;

            const newGroup: IGroup = {
              id: newGroupId,
              name: newGroupName,
            };

            setOpenEditGroup(false);

            await updateRepoGroup(newGroupId);
            await updateStarGroup(props.star.id, newGroup);
            await updateAllGroupList();
            // await updateStarList();
          }}
        >
          {groups.data.map((group) => {
            return (
              <MenuItem key={group.id} value={group.id}>
                {group.name}
              </MenuItem>
            );
          })}
        </Select>
      )}
    </div>
  );
};

export default EditRepo;
