import { IStar } from '@/common/api';
import { getStarsList } from '@/content_script/services/local/stars';
import { addTag } from '@/content_script/services/local/tag';
import { AppContext } from '@/options';
import EditRepo from '@/options/components/edit-repo';
import { fetchStarsListByGroup } from '@/options/pages/Home/actions';
import { selectorGroup } from '@/options/pages/Home/slices/selectedSlice';
import { AppDispatch, RootState } from '@/options/store';
import { Button, Dialog, DialogContent, DialogTitle, Stack } from '@mui/material';
import classNames from 'classnames';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const StarList: React.FC = () => {
  const [currentStarId, setCurrentStarId] = React.useState<number>();
  const { selectGroup, setSelectFullName, starsList, setStarsList, selectTag } = React.useContext(AppContext);

  const dispatch: AppDispatch = useDispatch();
  const stars = useSelector((state: RootState) => state.stars);
  const selectedGroup = useSelector(selectorGroup);

  React.useEffect(() => {
    (async () => {
      if (!selectGroup) return;
      dispatch(fetchStarsListByGroup(selectedGroup.id));
    })();
  }, [selectedGroup, dispatch]);

  const { data } = stars;

  React.useEffect(() => {
    (async () => {
      if (!selectTag) return;

      const list = await getStarsList({ tagId: selectTag.id });
      // setStarsList(list);
    })();
  }, [selectTag]);

  return (
    <>
      <div className="star-list">
        {data.length !== 0 ? (
          data.map((star: IStar) => {
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
