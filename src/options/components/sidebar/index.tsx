import { getGroupList, IGroup } from '@/content_script/services/local/group';
import { AppContext } from '@/options';
import {
  List,
  ListItem,
  ListItemButton,
  listItemButtonClasses,
  ListItemText,
  listItemTextClasses,
} from '@mui/material';
import { Box, styled } from '@mui/system';
import * as React from 'react';

const StyledListItemButton = styled(ListItemButton)(() => {
  return {
    [`&:hover`]: {
      color: '#FFF',
      background: 'none',
    },
    [`&.${listItemButtonClasses.root}`]: {
      color: '#cdcdcd',
    },
    [`&.${listItemButtonClasses.selected}`]: {
      background: 'none',
    },
    [`&.${listItemButtonClasses.selected} .${listItemTextClasses.primary}`]: {
      color: '#2BA379',
      fontWeight: 800,
    },
  };
});

const SideBar = (props: {}) => {
  const [groupList, setGroupList] = React.useState<IGroup[]>([]);

  const { group, setGroup } = React.useContext(AppContext);
  const currentGroupId = group?.id;

  React.useEffect(() => {
    (async () => {
      const groupList = await getGroupList();
      setGroupList(groupList);
    })();
  }, []);

  return (
    <div className="sidebar">
      <Box sx={{ width: '100%', color: '#b8c2cc' }}>
        <List>
          {groupList?.map((group) => {
            return (
              <ListItem key={group.id}>
                <StyledListItemButton
                  selected={group.id === currentGroupId}
                  onClick={() => {
                    setGroup(group);
                  }}
                >
                  <ListItemText>{group.name}</ListItemText>
                </StyledListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </div>
  );
};

export default SideBar;
