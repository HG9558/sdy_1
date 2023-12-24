const { VITE_TEMPLATE: template, VITE_THEME: style, VITE_CURRENT_SITE: site } = sessionStorage
//- img+背景 图片引用
export const useImgPath = (path: string) => {
  return `src/assets/wsdy-fastsub/pc/${template}/${style}/img/${path}`
  // return new URL(`../assets/wsdy-fastsub/pc/${template}/${style}/img/${path}`, import.meta.url).href;

}
//- logo引用
export const useLogoPath = (path: string) => {
  return `src/assets/wsdy-fastsub/pc/${template}/sites/logo/${site}/${style}_${path}`
  // return new URL(`../assets/wsdy-fastsub/pc/${template}/sites/logo/${site}/${style}_${path}`, import.meta.url).href;
}
//- 各个皮肤公共图片使用
export const useCommonImgPath = (path: string) => {
  return `src/assets/wsdy-fastsub/pc/${template}/common/${path}`
  // return new URL(`../assets/wsdy-fastsub/pc/${template}/common/${path}`, import.meta.url).href;
}
//- icon图片
export const useSiteImgPath = (path: String) => {
  return `src/assets/wsdy-fastsub/pc/${template}/sites/${path}`
  // return new URL(`../assets/wsdy-fastsub/pc/${template}/sites/${path}`, import.meta.url).href;
}

export const useErrorPath = (path: string, e: Event) => {
  return (e!.target as HTMLImageElement).src = `src/assets/wsdy-fastsub/pc/${template}/${style}/img/${path}`;
  // return (e!.target as HTMLImageElement).src = new URL(`../assets/wsdy-fastsub/pc/${template}/${style}/img/${path}`, import.meta.url).href;
}


export const preLoadImg = (_images: string[]) => {
  return null;
}

export const useSite = () => template + '_' + style;
