import './style.css';

import Loading from '@/content_script/components/loading';
import * as React from 'react';

interface IProps {
  text: string;
  className?: string;
  isLoading?: boolean;
  onClick?: () => {};
}

const Btn: React.FunctionComponent<IProps> = (props: IProps) => {
  return (
    <button
      className={props.className + ' github-plus-btn'}
      onClick={props.onClick}
    >
      {props.text}
      {props.isLoading ? <Loading /> : null}
    </button>
  );
};

Btn.defaultProps = {
  className: 'btn mt-2 mb-3',
  isLoading: false,
};

export default Btn;
