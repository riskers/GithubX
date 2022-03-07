import { getFullName, getHtmlUrl } from '@/common/tools';
import React from 'react';

const Repo: React.FC = () => {
  const clickStarBtn = (e: Event) => {
    const target = e.target as Element;
    if (target.classList.contains('btn-with-count')) {
      const parent = target.parentElement;
      const fullName = getFullName();
      if (parent.classList.contains('unstarred')) {
        // 点击了 STAR 按钮
        console.log('star');
        // addStar({
        //   starredAt: '',
        //   fullName,
        //   htmlUrl: getHtmlUrl(),
        //   group: '',
        //   tags: [],
        // });
      } else {
        // 点击了 UNSTAR 按钮
        console.log('unstar');
        // delStar(fullName);
      }
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', clickStarBtn, false);

    return () => document.removeEventListener('click', clickStarBtn);
  }, []);

  return <>repo page</>;
};

export default Repo;
