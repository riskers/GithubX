import './style.css';

import AddGistBtn from '@/content_script/pages/gist/AddGistBtn';
import Sidebar from '@/content_script/pages/gist/Sidebar';
import { isExistsGist } from '@/services/leancloud/gist';
import * as React from 'react';
import { IGist } from '@/services/leancloud/model/Gist';

export const gistContext = React.createContext(null);
export const URL = window.location.href;

const Gist: React.FC = () => {
  const [isExist, setIsExist] = React.useState(true);
  const [list, setList] = React.useState<IGist[]>([]);

  React.useEffect(() => {
    const fetchIsExist = async () => {
      const exist = await isExistsGist(URL);
      setIsExist(exist);
    };

    fetchIsExist();
  }, []);

  return (
    <gistContext.Provider
      value={React.useMemo(() => {
        return {
          isExist,
          setIsExist,
          list,
          setList,
        };
      }, [])}
    >
      <div className="github-plus-gist-sidebar">
        <AddGistBtn />
        <Sidebar />
      </div>
    </gistContext.Provider>
  );
};

export default Gist;
