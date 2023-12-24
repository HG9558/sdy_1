export const mergeGameList = (oldArr, newArr) => {
  if (oldArr[0]?.renderList) {
    const obj = {};
    const mergeArr = [...oldArr, ...newArr];
    mergeArr.forEach(item => {
      if (!obj[item.depotCode]) {
        obj[item.depotCode] = item;
      }
      obj[item.depotCode] = { ...obj[item.depotCode], ...item };
    })
    return Object.values(obj);
  }
  return newArr;
}