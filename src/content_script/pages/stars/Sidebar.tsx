import { IStar } from '@/common/api';
import { setUsername } from '@/common/tools';
import { getGroupList, IGroup, resetGroup } from '@/content_script/services/local/group';
import { getAllStarList, resetStars } from '@/content_script/services/local/stars';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import React, { useEffect, useState } from 'react';

const Row = ({ index, style }) => {
  return (
    <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
      Row {index}
    </div>
  );
};

const Sidebar = () => {
  /**
   * group list
   */
  const [groupList, setGroupList] = useState<IGroup[]>([]);

  /**
   * star list
   */
  const [starsList, setStarsList] = useState<IStar[]>();

  useEffect(() => {
    (async () => {
      const starList = await getAllStarList();
      setStarsList(starList);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const groupList = await getGroupList();
      setGroupList(groupList);
    })();
  }, []);

  return (
    <div className="github-plus-stars-list">
      <button
        onClick={async () => {
          await setUsername('riskers');
          await resetStars();
          await resetGroup();
        }}
      >
        reset riskers
      </button>

      {/* <button
        onClick={() => {
          addStar({ fullName: 'ss', group: '', htmlUrl: '', tags: [], id: 1423 });
        }}
      >
        click
      </button>
      <button
        onClick={() => {
          delStar('');
        }}
      >
        del
      </button> */}

      <button
        onClick={async () => {
          const x = await getAllStarList();
        }}
      >
        all
      </button>

      {starsList && groupList && (
        <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
          {groupList.map((group: IGroup) => {
            return (
              <TreeItem
                key={group.id}
                nodeId={group.id.toString()}
                label={group.name}
                onLabelClick={() => {
                  // toggleGroup(group.groupName);
                }}
              >
                {starsList
                  .filter((star) => star.group === group.name)
                  ?.map((star: IStar) => {
                    return (
                      <TreeItem
                        key={star.id}
                        nodeId={star.id.toString()}
                        label={star.fullName}
                        onLabelClick={() => {
                          location.href = star.htmlUrl;
                        }}
                      />
                    );
                  })}
              </TreeItem>
            );
          })}
        </TreeView>
      )}
    </div>
  );
};

export default Sidebar;
