import { IStar } from '@/common/api';
import { updateStar } from '@/content_script/services/local/stars';
import { addTag, getTag, getTagsList, ITag } from '@/content_script/services/local/tag';
import { AppContext } from '@/options';
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Chip,
  Container,
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
  const { tagsList, setTagsList } = React.useContext(AppContext);
  const [open, setOpen] = React.useState<boolean>(false);

  const [repoTagsList, setRepoTagsList] = React.useState<ITag[]>([]);

  const updateRepoTags = async (tagsId: string[]) => {
    const tags = await getTag(tagsId);
    // console.log('tags', tags);
    setRepoTagsList(tags);
  };

  const updateAllTaglist = async () => {
    const tags = await getTagsList();
    // console.log('alltagslist', tags);
    setTagsList(tags);
  };

  React.useEffect(() => {
    (async () => {
      await updateRepoTags(props.starTagsId);
    })();
  }, []);

  const handleClick = React.useCallback(() => {
    setOpen(false);
  }, []);

  React.useEffect(() => {
    document.addEventListener('click', handleClick, false);
    return () => document.removeEventListener('click', handleClick, false);
  });

  return (
    <div className="edit-repo">
      {!open && (
        <Container onClick={() => setOpen(true)} style={{ padding: 0 }}>
          {repoTagsList.map((tag) => {
            return (
              <Chip
                size="small"
                key={tag.id}
                label={tag.name}
                color="primary"
                style={{ cursor: 'pointer', marginRight: 5 }}
              />
            );
          })}

          <Chip
            size="small"
            label="Edit Tag"
            style={{ cursor: 'pointer', background: '#f1f5f8', color: '#606f7b' }}
            className="edit-label"
          />
        </Container>
      )}

      {open && (
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
    </div>
  );
};

export default EditRepo;
