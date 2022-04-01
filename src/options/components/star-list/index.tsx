import { IStar } from '@/common/api';
import { addTag } from '@/content_script/services/local/tag';
import { AppContext } from '@/options';
import EditRepo from '@/options/components/edit-repo';
import { selectorItem } from '@/options/pages/Home/slices/selectedSlice';
import { fetchStarsByGroup, fetchStarsByTag } from '@/options/pages/Home/slices/starsSlice';
import { AppDispatch, RootState } from '@/options/store';
import { Button, Dialog, DialogContent, DialogTitle, Stack } from '@mui/material';
import classNames from 'classnames';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const StarList: React.FC = () => {
  const [currentStarId, setCurrentStarId] = React.useState<number>();
  const { setSelectFullName } = React.useContext(AppContext);

  const dispatch: AppDispatch = useDispatch();
  const stars = useSelector((state: RootState) => state.stars);
  const selectedItem = useSelector(selectorItem);

  React.useEffect(() => {
    (async () => {
      dispatch(fetchStarsByGroup(selectedItem.group.id));
    })();
  }, [selectedItem.group.id, dispatch]);

  React.useEffect(() => {
    (async () => {
      dispatch(fetchStarsByTag(selectedItem.tag.id));
    })();
  }, [selectedItem.tag.id, dispatch]);

  return (
    <>
      <div className="star-list">
        {stars.data.length !== 0 ? (
          stars.data?.map((star: IStar) => {
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
