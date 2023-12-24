
const { VITE_CURRENT_SITE: site, VITE_LANGUAGE_LIST: lanList } = sessionStorage;
const language = !sessionStorage.getItem('GLOBALSTATE') ? import.meta.env.VITE_LANGUAGE : JSON.parse(sessionStorage.getItem('GLOBALSTATE') as string).language
const languageList = lanList || import.meta.env.VITE_LANGUAGE_LIST;

export const useCurrentTitle = () => {
  const languageData = JSON.parse(languageList).find((_: any) => _.languageType === language).languageList;
  return languageData[site || import.meta.env.VITE_CURRENT_SITE] as string;
}

export const useEnTitle = (): string => {
  const languageData = JSON.parse(languageList).find((_: any) => _.languageType === 'en').languageList;
  return languageData[import.meta.env.VITE_CURRENT_SITE] as string;
}
