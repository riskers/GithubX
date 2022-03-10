import { IStar } from '@/common/api';
import { getAllStarList } from '@/content_script/services/local/stars';
import { AppContext } from '@/options';
import { Chip } from '@mui/material';
import classNames from 'classnames';
import * as React from 'react';

const StarList = () => {
  const [currentStarId, setCurrentStarId] = React.useState<number>();
  const { selectGroup, setSelectFullName, starsList, setStarsList } = React.useContext(AppContext);

  React.useEffect(() => {
    (async () => {
      if (!selectGroup) return;

      const list = await getAllStarList(selectGroup.id);
      setStarsList(list);
    })();
  }, [selectGroup]);

  return (
    <>
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

      {/* <Dialog open={false}>
        <DialogTitle>Edit Repo</DialogTitle>
        <DialogContent>asd</DialogContent>

        <DialogActions>
          <Button>Cancel</Button>
          <Button>OK</Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
};

export default StarList;
