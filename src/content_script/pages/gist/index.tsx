import AddGistBtn from '@/content_script/pages/gist/AddGistBtn';
import Sidebar from '@/content_script/pages/gist/Sidebar';
import * as React from 'react';
import './style.css';

const Gist: React.FC = () => {
  return (
    <>
      <AddGistBtn />
      <div className="github-plus-gist-sidebar">
        <Sidebar />
      </div>
    </>
  );
};

export default Gist;
