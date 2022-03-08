import * as React from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import { getGroupList, IGroup } from '@/content_script/services/local/group';
import { IStar } from '@/common/api';
import { getAllStarList } from '@/content_script/services/local/stars';
import './style.css';

interface IProps {
  onSelect: (star: IStar) => void;
}

const SideBar = (props: IProps) => {
  const [groupList, setGroupList] = React.useState<IGroup[]>([]);
  const [starsList, setStarsList] = React.useState<IStar[]>();

  const onSelect = props.onSelect;

  React.useEffect(() => {
    (async () => {
      const starList = await getAllStarList();
      setStarsList(starList);
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      const groupList = await getGroupList();
      setGroupList(groupList);
    })();
  }, []);

  return (
    <div className="sidebar">
      <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
        {groupList?.map((group) => {
          return (
            <TreeItem key={group.id} nodeId={group.id.toString()} label={group.name}>
              {starsList
                .filter((star) => star.group === group.name)
                ?.map((star: IStar) => {
                  return (
                    <TreeItem
                      key={star.id}
                      nodeId={star.id.toString()}
                      label={star.fullName}
                      onClick={() => {
                        onSelect(star);
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

export default SideBar;
