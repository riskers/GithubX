import { getRepoContent } from '@/common/api';
import { selectorStar } from '@/options/slices/selectedStar';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';
import { Stack } from '@mui/material';

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
      {readme ? (
        <ReactMarkdown rehypePlugins={[rehypeSanitize]} remarkPlugins={[remarkGfm]}>
          {decodeURIComponent(escape(window.atob(readme)))}
        </ReactMarkdown>
      ) : (
        <Stack style={{ color: '#c5d2dd', paddingTop: 30 }} alignItems="center">
          <HourglassEmptyRoundedIcon sx={{ fontSize: 120 }} />
        </Stack>
      )}
    </div>
  );
};

export default Main;
