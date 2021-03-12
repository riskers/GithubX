import { getAllStarListFromCloud } from '@/content_script/services/stars';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import React, { useEffect, useState } from 'react';
import { IStar } from '../../model/Star';
import { getGroupList } from '@/content_script/services/group';
import { IGroup } from '@/content_script/model/Group';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const Sidebar = () => {
  const [starListMap, setStarListMap] = useState({});
  const [groupList, setGroupList] = useState<IGroup[]>([]);
  const [currentGroup, setCurrentGroup] = useState<string>();

  useEffect(() => {
    (async () => {
      const groupList = await getGroupList();
      setGroupList(groupList);
    })();
  }, []);

  const toggleGroup = async (group: string) => {
    // 再次点击 如果还是这个 group，不会请求
    if (group === currentGroup) return;

    setCurrentGroup(group);
    const list = await getAllStarListFromCloud(group);
    const tmp = {
      [group]: list,
      ...starListMap,
    };

    setStarListMap(tmp);
  };

  return (
    <div className="github-plus-stars-list">
      <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
        {groupList.map((group: IGroup) => {
          return (
            <TreeItem
              key={group.objectId}
              nodeId={group.objectId}
              label={group.groupName}
              onLabelClick={() => {
                toggleGroup(group.groupName);
              }}
            >
              {starListMap[group.groupName]?.map((star: IStar) => {
                return (
                  <TreeItem
                    key={star.objectId}
                    nodeId={star.objectId}
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
    </div>
  );
};

export default Sidebar;
