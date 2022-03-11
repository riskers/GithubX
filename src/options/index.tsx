/* eslint-disable react/jsx-no-constructed-context-values */
import { IStar } from '@/common/api';
import { DEFAULT_GROUP, IGroup } from '@/content_script/services/local/group';
import Main from '@/options/components/main';
import SideBar from '@/options/components/sidebar';
import StarList from '@/options/components/star-list';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ITag } from '../content_script/services/local/tag';
import './style.css';

interface IAppContext {
  selectFullName: string;
  selectGroup: IGroup;
  selectTag: ITag;
  groupList: IGroup[];
  tagsList: ITag[];
  starsList: IStar[];
  setSelectFullName?: React.Dispatch<React.SetStateAction<string>>;
  setSelectGroup?: React.Dispatch<React.SetStateAction<IGroup>>;
  setSelectTag?: React.Dispatch<React.SetStateAction<ITag>>;
  setGroupList?: React.Dispatch<React.SetStateAction<IGroup[]>>;
  setTagsList?: React.Dispatch<React.SetStateAction<ITag[]>>;
  setStarsList?: React.Dispatch<React.SetStateAction<IStar[]>>;
}

export const AppContext = React.createContext<IAppContext>({
  selectFullName: '',
  selectGroup: {
    name: '',
    id: '-1',
  },
  selectTag: {
    id: '-1',
    name: '',
  },
  groupList: [],
  tagsList: [],
  starsList: [],
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#2BA379',
    },
    secondary: {
      main: '#13283a',
    },
  },
  components: {
    MuiListItemButton: {
      defaultProps: {
        disableTouchRipple: true,
      },
    },
  },
});

const App: React.FC = () => {
  const [groupList, setGroupList] = React.useState<IGroup[]>([]);
  const [tagsList, setTagsList] = React.useState<ITag[]>([]);
  const [selectFullName, setSelectFullName] = React.useState<string>();
  const [selectGroup, setSelectGroup] = React.useState<IGroup>();
  const [selectTag, setSelectTag] = React.useState<ITag>();
  const [starsList, setStarsList] = React.useState<IStar[]>([]);

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider
        value={{
          selectFullName,
          setSelectFullName,
          selectGroup,
          setSelectGroup,
          selectTag,
          setSelectTag,
          groupList,
          setGroupList,
          tagsList,
          setTagsList,
          starsList,
          setStarsList,
        }}
      >
        <div className="github-plus-app">
          <SideBar />
          <StarList />
          <Main />
        </div>
      </AppContext.Provider>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
