import { getAllStarListFromCloud } from '@/content_script/services/stars';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import React, { useEffect, useState } from 'react';
import { IStar } from '../../model/Star';

const Sidebar = () => {
  const [starList, setStarList] = useState<IStar[]>([]);

  useEffect(() => {
    (async () => {
      // await init();
      const r = await getAllStarListFromCloud();
      console.log(r);
    })();
  }, []);

  const list = [];

  return (
    <div className="github-plus-stars-list">
      <TreeView>
        {list.map((gist) => {
          return (
            <TreeItem
              key={gist.objectId}
              nodeId={gist.objectId}
              label={gist.desc ?? gist.title}
              onLabelClick={() => {
                location.href = gist.url;
              }}
            />
          );
        })}
      </TreeView>
    </div>
  );
};

export default Sidebar;
