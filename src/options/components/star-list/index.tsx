import { IStar } from '@/common/api';
import { getAllStarList } from '@/content_script/services/local/stars';
import { AppContext } from '@/options';
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Input } from '@mui/material';
import classNames from 'classnames';
import * as React from 'react';

const StarList = () => {
  const [currentStarId, setCurrentStarId] = React.useState<number>();
  const { selectGroup, setSelectFullName } = React.useContext(AppContext);
  const [starsList, setStarsList] = React.useState<IStar[]>([]);

  React.useEffect(() => {
    (async () => {
      const starList = await getAllStarList();

      setStarsList(starList);
    })();
  }, [selectGroup]);

  console.log(starsList);

  return (
    <>
      <div className="star-list">
        {selectGroup &&
          starsList
            .filter((star) => star.group === selectGroup.name)
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

      <Dialog open={false}>
        <DialogTitle>Edit Repo</DialogTitle>
        <DialogContent>asd</DialogContent>

        <DialogActions>
          <Button>Cancel</Button>
          <Button>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StarList;
