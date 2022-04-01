import { IStar } from '@/common/api';
import { getGroup, getGroupList, IGroup } from '@/content_script/services/local/group';
import { getStarsListByGroup, updateStar } from '@/content_script/services/local/stars';
import { addTag, getTag, getTagsList, ITag } from '@/content_script/services/local/tag';
import { AppContext } from '@/options';
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

interface IProps {
  star: IStar;

  /**
   * stars' tags id list
   */
  starTagsId: string[];
}

const EditRepo = (props: IProps) => {
  const { selectGroup, groupList, setGroupList, tagsList, setTagsList, setStarsList } = React.useContext(AppContext);
  const [openEditTag, setOpenEditTag] = React.useState<boolean>(false);
  const [openEditGroup, setOpenEditGroup] = React.useState<boolean>(false);
  const [repoGroup, setRepoGroup] = React.useState<IGroup>(selectGroup);
  const [repoTagsList, setRepoTagsList] = React.useState<ITag[]>([]);

  const updateRepoGroup = async (groupId: string) => {
    const groupInfo = await getGroup(groupId);
    setRepoGroup(groupInfo);
  };

  const updateStarList = async () => {
    const list = await getStarsListByGroup(selectGroup.id);
    const ll = list.filter((star) => star.groupId === selectGroup.id);
    setStarsList(ll);
  };

  const updateRepoTags = async (tagsId: string[]) => {
    const tags = await getTag(tagsId);
    setRepoTagsList(tags);
  };

  const updateAllGroupList = async () => {
    const groupList = await getGroupList();
    setGroupList(groupList);
  };

  const updateAllTaglist = async () => {
    const tags = await getTagsList();
    setTagsList(tags);
  };

  React.useEffect(() => {
    (async () => {
      await updateRepoTags(props.starTagsId);
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
          {repoTagsList.map((tag) => {
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
          value={repoTagsList}
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
            const vlist = repoTagsList.map((tag) => tag.id);

            if (r === 'createOption') {
              const tag = await addTag(d.option as string);
              const newStar: IStar = {
                ...props.star,
                tagsId: vlist.concat(tag.id),
              };

              await updateRepoTags(repoTagsList.map((tag) => tag.id).concat(tag.id));
              await updateStar(newStar);
              await updateAllTaglist();
            }

            if (r === 'selectOption') {
              const tag = d.option as ITag;
              await updateRepoTags(repoTagsList.map((tag) => tag.id).concat(tag.id));

              const newStar: IStar = {
                ...props.star,
                tagsId: vlist.concat(tag.id),
              };
              await updateStar(newStar);
              await updateAllTaglist();
            }

            if (r === 'removeOption') {
              const tag = d.option as ITag;

              const excludeTagIds = without(vlist, tag.id);

              await updateRepoTags(excludeTagIds);

              const newStar: IStar = {
                ...props.star,
                tagsId: excludeTagIds,
              };
              await updateStar(newStar);
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
            return value.map((option, index) => {
              return <Chip color="success" label={option.name} key={index} size="small" {...getTagProps({ index })} />;
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
            label={selectGroup.name}
            color="secondary"
            icon={<EditIcon />}
            clickable
            style={{ marginRight: 5, borderRadius: 5, marginTop: 10 }}
          />
        </Container>
      )}

      {openEditGroup && (
        <Select
          id={`select-group-${selectGroup.id}`}
          size="small"
          autoWidth
          value={repoGroup.id}
          style={{ marginTop: 10 }}
          onChange={async (event: SelectChangeEvent) => {
            const newGroupdId = event.target.value;
            const newStar: IStar = {
              ...props.star,
              groupId: newGroupdId,
            };

            setOpenEditGroup(false);
            await updateRepoGroup(newGroupdId);
            await updateStar(newStar);
            await updateAllGroupList();
            await updateStarList();
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
      )}
    </div>
  );
};

export default EditRepo;
