import * as React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import './style.css';
import { Tabs, Tab, AppBar } from '@material-ui/core';

const App: React.FC = () => {
  const [tabIndex, setTabIndex] = React.useState<number>(0);

  const handleChange = (event: React.ChangeEvent<{}>, index: number) => {
    setTabIndex(index);
  };

  return (
    <div className="github-plus-sidebar">
      <AppBar position="static">
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="1" id="1" />
          <Tab label="1" id="2" />
          <Tab label="1" id="3" />
        </Tabs>
        <TreeView>
          {/* {list.map((gist) => {
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
      })} */}
        </TreeView>
      </AppBar>
    </div>
  );
};

export default App;
