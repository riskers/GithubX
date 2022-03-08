import * as React from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import { getGroupList, IGroup } from '@/content_script/services/local/group';
import { IStar } from '@/common/api';
import { getAllStarList } from '@/content_script/services/local/stars';
import { styled } from '@mui/system';
import InlineStar from '@/options/components/inline-star';

interface StyledTreeItemProps {
  rootNode?: boolean;
}

const StyledTreeTitle = styled(TreeItem)<StyledTreeItemProps>(({ rootNode }) => {
  return {
    position: 'relative',
    color: '#b8c2cc',
    [`&:hover`]: {
      color: '#FFF',
    },
    [`& .${treeItemClasses.group}`]: {
      marginLeft: 3,
      paddingLeft: 4,
    },
    [`& .${treeItemClasses.content}`]: {
      fontSize: 17,
      padding: '5px 0',
    },
    [`& .${treeItemClasses.selected}`]: {
      color: '#21a179',
    },
    [`& .${treeItemClasses.selected}.${treeItemClasses.content}.${treeItemClasses.focused}`]: {
      background: 'rgba(0, 0, 0, 0.3)',
    },
  };
});

const StyledTreeItem = styled(TreeItem)<StyledTreeItemProps>(({ rootNode }) => {
  return {
    position: 'relative',
    color: '#b8c2cc',
    [`&:hover`]: {
      color: '#FFF',
    },
    [`& .${treeItemClasses.group}`]: {
      // marginLeft: 3,
      // paddingLeft: 4,
    },
    [`& .${treeItemClasses.content}`]: {
      fontSize: 16,
      padding: '10px 5px 10px 0',
    },
    [`& .${treeItemClasses.iconContainer}`]: {
      width: 9,
    },
    [`& .${treeItemClasses.selected}`]: {
      color: '#21a179',
      borderLeft: '3px #FFF solid',
    },
    [`& .${treeItemClasses.selected}.${treeItemClasses.content}.${treeItemClasses.focused}`]: {
      background: 'none',
    },
    [`& .${treeItemClasses.selected} .${treeItemClasses.label}`]: {
      fontWeight: 800,
    },
  };
});

const SideBar = (props: {}) => {
  const [groupList, setGroupList] = React.useState<IGroup[]>([]);
  const [starsList, setStarsList] = React.useState<IStar[]>();

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
            <StyledTreeTitle key={group.id} nodeId={group.id.toString()} label={group.name}>
              {starsList
                .filter((star) => star.group === group.name)
                ?.map((star: IStar) => {
                  return (
                    <StyledTreeItem key={star.id} nodeId={star.id.toString()} label={<InlineStar star={star} />} />
                  );
                })}
            </StyledTreeTitle>
          );
        })}
      </TreeView>
    </div>
  );
};

export default SideBar;
