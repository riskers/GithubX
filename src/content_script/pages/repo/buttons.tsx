import { IStar } from '@/common/api';
import React from 'react';

interface IProps {
  starInfo: IStar;
}

const Buttons: React.FC<IProps> = (props) => {
  console.log(props.starInfo);
  return <div>buttons</div>;
};

export default Buttons;
