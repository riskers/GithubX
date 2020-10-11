import React, { useEffect } from 'react';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import { getStarList, addStar } from '@/content_script/services/stars';

const Sidebar = () => {
  useEffect(() => {
    (async () => {
      const res = await getStarList(1);
      await addStar(res);
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
