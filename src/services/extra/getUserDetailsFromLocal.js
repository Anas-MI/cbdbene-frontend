export const getUserDetailsFromLocal = () => {
  return JSON.parse(localStorage.getItem("loginUserDetails"));
};
