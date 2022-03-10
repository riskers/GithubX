/* eslint-disable react/jsx-no-constructed-context-values */
import { IStar } from '@/common/api';
import { DEFAULT_GROUP, IGroup } from '@/content_script/services/local/group';
import Main from '@/options/components/main';
import SideBar from '@/options/components/sidebar';
import StarList from '@/options/components/star-list';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './style.css';

interface IAppContext {
  selectFullName: string;
  selectGroup: IGroup;
  groupList: IGroup[];
  starsList: IStar[];
  setSelectFullName?: React.Dispatch<React.SetStateAction<string>>;
  setSelectGroup?: React.Dispatch<React.SetStateAction<IGroup>>;
  setGroupList?: React.Dispatch<React.SetStateAction<IGroup[]>>;
  setStarsList?: React.Dispatch<React.SetStateAction<IStar[]>>;
}

export const AppContext = React.createContext<IAppContext>({
  selectFullName: '',
  selectGroup: {
    name: '',
    id: '-1',
  },
  groupList: [],
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
  const [groupList, setGroupList] = React.useState<IGroup[]>();
  const [selectFullName, setSelectFullName] = React.useState<string>();
  const [selectGroup, setSelectGroup] = React.useState<IGroup>();
  const [starsList, setStarsList] = React.useState<IStar[]>();

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider
        value={{
          selectFullName,
          setSelectFullName,
          selectGroup,
          setSelectGroup,
          groupList,
          setGroupList,
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
