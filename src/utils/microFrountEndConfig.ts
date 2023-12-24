import { setupApp, preloadApp } from 'wujie';

export const microFrontEndConfig = () => {
  setupApp({
    name: 'demo1',
    url: 'https://chenlong-1259079405.cos-website.ap-beijing.myqcloud.com/',
  })

  preloadApp({
    name: 'demo1',
    url: 'https://chenlong-1259079405.cos-website.ap-beijing.myqcloud.com/',
    alive: true,
    exec: true,
  });

  setupApp({
    name: 'demo2',
    url: 'https://self-document-1259079405.cos-website.ap-beijing.myqcloud.com',
  })

  preloadApp({
    name: 'demo2',
    alive: true,
    url: 'https://self-document-1259079405.cos-website.ap-beijing.myqcloud.com',
  });
}