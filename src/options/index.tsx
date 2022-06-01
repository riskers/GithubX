import theme from '@/common/theme';
import GlobalAlert from '@/options/components/alert';
import Progress from '@/options/components/progress';
import SideBar from '@/options/components/sidebar';
import Gist from '@/options/pages/Gist';
import Home from '@/options/pages/Home';
import store from '@/options/store';
import setUpAxios, { R } from '@/services/db/APISetUp';
import { ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './style.css';
import gtag from '@/utils/gtag';

setUpAxios(R, store);

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<SideBar />}>
              <Route index element={<Home />} />
              <Route path="/gist" element={<Gist />} />
            </Route>
          </Routes>
        </HashRouter>

        <GlobalAlert />
        <Progress />
      </Provider>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

window.dataLayer = window.dataLayer || [];
function gtag(a1: any, a2: any) {
  (window.dataLayer as any).push([a1, a2]);
}
gtag('js', new Date());
gtag('config', 'G-W8J4DHFYPV');
