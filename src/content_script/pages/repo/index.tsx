import React from 'react';
import { delStar, addStar } from '@/content_script/services/stars';
import { getFullName, getHtmlUrl } from '@/common/tools';

const Repo: React.FC = () => {
  const clickStarBtn = (e: Event) => {
    const target = e.target as Element;
    if (target.classList.contains('btn-with-count')) {
      const parent = target.parentElement;
      const fullName = getFullName();
      console.log(parent.classList);
      if (parent.classList.contains('unstarred')) {
        // 点击了 STAR 按钮
        console.log('star');
        addStar({
          starredAt: '',
          fullName,
          htmlUrl: getHtmlUrl(),
        });
      } else {
        // 点击了 UNSTAR 按钮
        console.log('unstar');
        delStar(fullName);
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
