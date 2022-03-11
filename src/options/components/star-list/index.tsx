import { IStar } from '@/common/api';
import { getStarsList } from '@/content_script/services/local/stars';
import { AppContext } from '@/options';
import { Autocomplete, Chip } from '@mui/material';
import classNames from 'classnames';
import * as React from 'react';

const StarList = () => {
  const [currentStarId, setCurrentStarId] = React.useState<number>();
  const { selectGroup, setSelectFullName, starsList, setStarsList } = React.useContext(AppContext);

  React.useEffect(() => {
    (async () => {
      if (!selectGroup) return;

      const list = await getStarsList({ groupId: selectGroup.id });
      setStarsList(list);
    })();
  }, [selectGroup]);

  return (
    <div className="star-list">
      {selectGroup &&
        starsList
          ?.filter((star) => star.groupId === selectGroup.id)
          ?.map((star: IStar) => {
            return (
              <div
                key={star.id}
                className={classNames('star', {
                  selected: currentStarId === star.id,
                })}
                onClick={() => {
                  setCurrentStarId(star.id);
                  setSelectFullName(star.fullName);
                }}
              >
                <div>
                  <h2>{star.fullName}</h2>
                </div>

                <div className="edit-area">
                  {/* <Autocomplete
                    multiple
                    id="tags-filled"
                    options={top100Films.map((option) => option.title)}
                    defaultValue={[top100Films[13].title]}
                    freeSolo
                    renderTags={(value: readonly string[], getTagProps) =>
                      value.map((option: string, index: number) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField {...params} variant="filled" label="freeSolo" placeholder="Favorites" />
                    )}
                  /> */}
                  <Chip
                    size="small"
                    label="edit"
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  />
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default StarList;
