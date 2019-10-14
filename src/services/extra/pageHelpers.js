import { countries } from "./countrySelectorOption";
export const getPageContent = (
  array = [],
  cnt = "North America",
  altCnt = "North America",
  altCnt1 = "South America"
) => {
  const res1 = array.find(el => {
    return el.continent.includes(cnt);
  });
  if (res1) {
    return res1;
  }
  const res2 = array.find(el => {
    return el.continent.includes(altCnt) || el.continent.includes(altCnt1);
  });
  if (res2) {
    return res2;
  }
  return array[0];
};

export const getContinentName = countryName => {
  let continentName = null;
  Object.values(countries).map((el, index) => {
    const arr = el.split("|");
    if (arr.some(ctr => ctr === countryName)) {
      continentName = Object.keys(countries)[index];
    }
    return null;
  });
  return continentName;
};
