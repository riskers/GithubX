import { IStar } from '@/common/api';
import { getStarsList } from '@/content_script/services/local/stars';
import { addTag, ITag } from '@/content_script/services/local/tag';
import { AppContext } from '@/options';
import EditRepo from '@/options/components/edit-repo';
import { Autocomplete, Button, Chip, Dialog, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import classNames from 'classnames';
import * as React from 'react';

const StarList = () => {
  const [currentStarId, setCurrentStarId] = React.useState<number>();
  const { selectGroup, setSelectFullName, starsList, setStarsList, selectTag } = React.useContext(AppContext);

  React.useEffect(() => {
    (async () => {
      if (!selectGroup) return;

      const list = await getStarsList({ groupId: selectGroup.id });
      const ll = list.filter((star) => star.groupId === selectGroup.id);
      setStarsList(ll);
    })();
  }, [selectGroup]);

  React.useEffect(() => {
    (async () => {
      if (!selectTag) return;

      const list = await getStarsList({ tagId: selectTag.id });
      setStarsList(list);
    })();
  }, [selectTag]);

  return (
    <>
      <div className="star-list">
        {starsList.length !== 0 ? (
          starsList.map((star: IStar) => {
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

                <div
                  className="edit-area"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <EditRepo star={star} starTagsId={star.tagsId} />
                </div>
              </div>
            );
          })
        ) : (
          <Stack justifyContent="center" alignItems="center" style={{ fontSize: 20, padding: 30, color: '#c5d2dd' }}>
            Empty...
          </Stack>
        )}
      </div>

      <Dialog open={false}>
        <DialogTitle>Edit Repo</DialogTitle>
        <DialogContent>
          <Button
            onClick={async () => {
              await addTag('acvcv');
            }}
          >
            add a tag
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StarList;
