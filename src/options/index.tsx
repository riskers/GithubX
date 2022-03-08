import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SideBar from '@/options/components/sidebar';
import Main from '@/options/components/main';
import './style.css';
import { IStar } from '@/common/api';

const App: React.FC = () => {
  const [fullname, setFullname] = React.useState<string>();

  return (
    <div className="github-plus-app">
      <SideBar
        onSelect={(star: IStar) => {
          setFullname(star.fullName);
        }}
      />
      <Main fullname={fullname} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
