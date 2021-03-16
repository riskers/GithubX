import * as React from 'react';

interface IProps {
  readonly items: React.Component[];
}

const Tree: React.FC<IProps> = (props: IProps) => {
  return (
    <ul>
      {props.items?.map((item) => {
        return item;
      })}
    </ul>
  );
};

export default Tree;
