import { IGist } from '@/content_script/model/Gist';
import { getAllGistList } from '@/content_script/services/gist';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import React from 'react';
import { gistContext } from './index';

const Sidebar: React.FC = () => {
  const { isExist, list, setList } = React.useContext(gistContext);

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await getAllGistList();
      setList(res);
    };

    fetchData();
  }, [isExist]);

  return (
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
    // <TreeView>
    //   <TreeItem nodeId="1" label="Applications">
    //     <TreeItem nodeId="2" label="Calendar" />
    //     <TreeItem nodeId="3" label="Chrome" />
    //     <TreeItem nodeId="4" label="Webstorm" />
    //   </TreeItem>
    //   <TreeItem nodeId="5" label="Documents">
    //     <TreeItem nodeId="10" label="OSS" />
    //     <TreeItem nodeId="6" label="Material-UI">
    //       <TreeItem nodeId="7" label="src">
    //         <TreeItem nodeId="8" label="index.js" />
    //         <TreeItem nodeId="9" label="tree-view.js" />
    //       </TreeItem>
    //     </TreeItem>
    //   </TreeItem>
    // </TreeView>
  );
};

export default Sidebar;
