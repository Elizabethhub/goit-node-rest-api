export const parseBoolean = (favoriteValue) => {
  const favorite = favoriteValue === "true" ? true : favoriteValue === "false" ? false : null;
  return favorite;
};
