import { IStar } from '@/common/api';
import { ACTION_SHOW_OPTION_PAGE } from '@/common/constants';
import { DEFAULT_GROUP, getGroupList, IGroup, resetGroup } from '@/services/idb/group';
import { setSettings } from '@/services/idb/settings';
import { getStarsListByGroup, resetStars } from '@/services/idb/stars';
import { resetTag } from '@/services/idb/tag';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
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
      const starList = await getStarsListByGroup(DEFAULT_GROUP.id);
      setStarsList(starList);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const groupList = await getGroupList();
      // setGroupList(groupList);
    })();
  }, []);

  return (
    <div className="github-plus-stars-list">
      <button
        onClick={async () => {
          await setSettings({ username: 'riskers' });
          await resetStars('riskers');
          await resetGroup();
          await resetTag();
        }}
      >
        reset riskers
      </button>

      <button
        onClick={() => {
          chrome.runtime.sendMessage(ACTION_SHOW_OPTION_PAGE);
        }}
      >
        open option
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
          const x = await getStarsListByGroup(DEFAULT_GROUP.id);
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
                // onLabelClick={() => {
                //   // toggleGroup(group.groupName);
                // }}
              >
                {starsList
                  .filter((star) => star.groupId === group.id)
                  ?.map((star: IStar) => {
                    return (
                      <TreeItem
                        key={star.id}
                        nodeId={star.id.toString()}
                        label={star.fullName}
                        // onLabelClick={() => {
                        //   location.href = star.htmlUrl;
                        // }}
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
