import { rest } from "./rest";
export const addCardDetails = data => {
  if (data.profileid) return rest.post("/authorize/addcard", data);
  else return rest.post("/authorize/savecard", data);
};
export const deleteCardDetails = data =>
  rest.post("/authorize/deletecard", data);
