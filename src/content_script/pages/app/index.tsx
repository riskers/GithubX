import { getAllStarListFromCloud } from '@/content_script/services/stars';
import { forOwn, groupBy } from 'lodash';
import * as React from 'react';
import { Treebeard, TreeNode } from 'react-treebeard';
import './style.css';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import TreeItem from '@material-ui/lab/TreeItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);

type ITreeStar = TreeNode;

const App: React.FC = () => {
  // const [data, setData] = React.useState<ITreeStar>({ name: 'root' });
  // const [cursor, setCursor] = React.useState<ITreeStar>({ name: '' });

  // // refresh list
  // React.useEffect(() => {
  //   (async () => {
  //     // await refresh();
  //   })();
  // }, []);

  // React.useEffect(() => {
  //   (async () => {
  //     let sourceData = await getAllStarListFromCloud();

  //     let m = sourceData.map((s) => {
  //       return {
  //         ...s,
  //         name: s.fullName,
  //       };
  //     });

  //     // 已分组信息
  //     const groupedData = groupBy(m, 'group');

  //     let starList: ITreeStar[] = [];
  //     forOwn(groupedData, (v, k) => {
  //       starList.push({
  //         name: k,
  //         children: v,
  //       });
  //     });

  //     console.log(starList);
  //     setData({
  //       ...data,
  //       children: starList,
  //     });
  //   })();
  // }, []);

  // const onToggle = (node, toggled) => {
  //   if (cursor) {
  //     cursor.active = false;
  //   }

  //   node.active = true;
  //   if (node.children) {
  //     node.toggled = toggled;
  //   }
  //   setCursor(node);
  //   setData({ ...data });
  // };

  // const classes = useStyles();
  // const [open, setOpen] = React.useState(true);

  // const handleClick = () => {
  //   setOpen(!open);
  // };

  return <div className="github-plus-sidebar" />;
};

export default App;
