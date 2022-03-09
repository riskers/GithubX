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
  fullName: string;
  group: IGroup;
  setFullName?: React.Dispatch<React.SetStateAction<string>>;
  setGroup?: React.Dispatch<React.SetStateAction<IGroup>>;
}

export const AppContext = React.createContext<IAppContext>({
  fullName: '',
  group: {
    name: '',
    id: -1,
  },
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
  const [fullName, setFullName] = React.useState<string>();
  const [group, setGroup] = React.useState<IGroup>();

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={{ fullName, setFullName, group, setGroup }}>
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
