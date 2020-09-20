import AV from 'leancloud-storage'

AV.init({
  appId: "En0YUDrDK6O2aecV9qGaVKbD-gzGzoHsz",
  appKey: "mFOxOKdtEWTnF9gRVYNtNupx",
  serverURL: 'https://leancloud.cn:443'
});

const Gist = AV.Object.extend('gist')

const gist = new Gist()
gist.set('name', 'xx')
gist.set('content', 'cxzzxcc')

gist.save().then((x) => {
  console.log(x)
})