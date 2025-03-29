import searchPlacesApiGateway from "./apiService";

export const getPlaces = async (url) => {
  try {
    const res = await searchPlacesApiGateway.request({
      method: "get",
      url,
    });
    return res;
  } catch (error) {
    return error.message;
  }
};
