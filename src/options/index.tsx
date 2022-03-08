import { IStar } from '@/common/api';
import Main from '@/options/components/main';
import SideBar from '@/options/components/sidebar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './style.css';

interface IAppContext {
  url: string;
  fullName: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  setFullName: React.Dispatch<React.SetStateAction<string>>;
}

export const AppContext = React.createContext<IAppContext>(null);

const theme = createTheme({
  palette: {
    primary: {
      main: '#2BA379',
    },
    secondary: {
      main: '#13283a',
    },
  },
});

const App: React.FC = () => {
  const [url, setUrl] = React.useState<string>();
  const [fullName, setFullName] = React.useState<string>();

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AppContext.Provider value={{ url, setUrl, fullName, setFullName }}>
      <ThemeProvider theme={theme}>
        <div className="github-plus-app">
          <SideBar />
          <Main />
        </div>
      </ThemeProvider>
    </AppContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
