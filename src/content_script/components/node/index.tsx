import * as React from 'react';

interface IProps {
  // node: TreeNode;
  url: string;
  expanded: boolean;
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>, node: any) => void;
}

const Node = (props: IProps) => {
  return (
    <a href={props.url}>
      <div>1</div>
    </a>
  );
};

export default Node;
