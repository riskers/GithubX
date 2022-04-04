import { getRepoContent } from '@/common/api';
import { selectorStar } from '@/options/slices/selectedStar';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

const Main: React.FC = () => {
  const selectedStar = useSelector(selectorStar);
  const [readme, setReadme] = React.useState<string>('');

  React.useEffect(() => {
    if (!selectedStar.fullName) return;

    (async () => {
      const res = await getRepoContent(selectedStar.fullName);
      setReadme(res.content);
    })();
  }, [selectedStar.fullName]);

  return (
    <div className="main">
      <ReactMarkdown rehypePlugins={[rehypeSanitize]} remarkPlugins={[remarkGfm]}>
        {decodeURIComponent(escape(window.atob(readme)))}
      </ReactMarkdown>
    </div>
  );
};

export default Main;
