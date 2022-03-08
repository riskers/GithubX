import { getRepoContent } from '@/common/api';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

interface IProps {
  fullname: string;
}

const Main = (props: IProps) => {
  const [readme, setReadme] = React.useState<string>('');
  console.log(props);
  React.useEffect(() => {
    if (!props.fullname) return;

    (async () => {
      const res = await getRepoContent(props.fullname);
      setReadme(res.content);
    })();
  }, [props.fullname]);

  return (
    <div className="main">
      <ReactMarkdown rehypePlugins={[rehypeSanitize]} remarkPlugins={[remarkGfm]}>
        {decodeURIComponent(escape(window.atob(readme)))}
      </ReactMarkdown>
    </div>
  );
};

export default Main;
