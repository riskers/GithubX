import { IStar } from '@/common/api';
import { updateStar } from '@/content_script/services/local/stars';
import { addTag, ITag } from '@/content_script/services/local/tag';
import { AppContext } from '@/options';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Chip,
  IconButton,
  TextField,
} from '@mui/material';
import * as React from 'react';

interface IProps {
  star: IStar;
  /**
   * tag list in star
   */
  defaultTagsList: string[];
}

const EditRepo = (props: IProps) => {
  const { tagsList } = React.useContext(AppContext);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };

  const open = Boolean(anchorEl);

  return (
    <div className="edit-repo">
      <IconButton
        aria-describedby={props.star.id.toString()}
        onClick={handleOpen}
        aria-label="edit"
        size="small"
        sx={{
          color: 'red',
        }}
      >
        <MoreHorizRoundedIcon />
      </IconButton>

      {open && (
        <Autocomplete
          id={`tags-selected-${props.star.id}`}
          multiple
          disableClearable
          size="small"
          options={tagsList}
          noOptionsText="Add a tag..."
          defaultValue={props.defaultTagsList}
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

            if (r === 'createOption') {
              // d.option.
              const tag = await addTag(d.option as string);
              const newStar: IStar = {
                ...props.star,
                tagsId: props.star.tagsId.concat(tag.id),
              };
              await updateStar(newStar);
            }

            if (r === 'selectOption') {
              // TODO
              // await updatTag();
            }
          }}
          getOptionLabel={(option) => {
            console.log(option);
            if (typeof option === 'string') {
              return option;
            }

            return option.name;
          }}
          renderTags={(value: ITag[], getTagProps) => {
            console.log(value);
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
