/* eslint-disable react/jsx-no-constructed-context-values */
import { IStar } from '@/common/api';
import { DEFAULT_GROUP, IGroup } from '@/services/idb/group';
import { getSettings, ISettings } from '@/services/idb/settings';
import Main from '@/options/components/main';
import SideBar from '@/options/components/sidebar';
import StarList from '@/options/components/star-list';
import Settings from '@/options/components/user';
import Home from '@/options/pages/Home';
import store from '@/options/store';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ITag } from '../services/idb/tag';
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
    id: 0,
  },
  selectTag: {
    id: 0,
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
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="github-plus-app">
          <Home />
        </div>
      </Provider>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
