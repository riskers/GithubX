import Gist from '../model/Gist';

interface IGist {
  title?: string;
  url: string;
  desc?: string;
}

const addGist = async (gistParam: IGist) => {
  const gist = new Gist();
  gist.set('title', gistParam.title)
  gist.set('url', gistParam.url)

  return await gist.save()
}

export {
  addGist,
}