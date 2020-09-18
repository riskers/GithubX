import * as React from 'react';

interface IProps {
  text: string;
  className?: string;
}

const Btn: React.FunctionComponent<IProps> = (props: IProps) => {
  return <button className={props.className}>
    {props.text}
  </button>;
}

Btn.defaultProps = {
  className: 'btn mt-2 mb-3'
}

export default Btn;
