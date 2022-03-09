import { IStar } from '@/common/api';
import { getAllStarList } from '@/content_script/services/local/stars';
import { AppContext } from '@/options';
import { Chip } from '@mui/material';
import classNames from 'classnames';
import * as React from 'react';

const StarList = () => {
  const [currentStarId, setCurrentStarId] = React.useState<number>();
  const { group, setFullName } = React.useContext(AppContext);
  const [starsList, setStarsList] = React.useState<IStar[]>([]);

  React.useEffect(() => {
    (async () => {
      const starList = await getAllStarList();
      setStarsList(starList);
    })();
  }, [group]);

  return (
    <div className="star-list">
      {group &&
        starsList
          .filter((star) => star.group === group.name)
          ?.map((star: IStar) => {
            return (
              <div
                key={star.id}
                className={classNames('star', {
                  selected: currentStarId === star.id,
                })}
                onClick={() => {
                  setCurrentStarId(star.id);
                  setFullName(star.fullName);
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
  );
};

export default StarList;
