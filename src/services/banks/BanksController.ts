import { getBanks } from "./providers/DataProvider";

export const getBanksList = () => {
    return getBanks();
}
/*
export const getPlacesByName = async (q: string) => {
  if (q.length < 3) {
    return {
      type: "FeatureCollection",
      features: []
    };
  }

  return await getBanks(q);
};
*/