import { baseUrl } from "../../components/Constants";

export const getProductByCat = (title = "Pets") => {
  return fetch(`${baseUrl}/products/api/bycategory`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: title
    })
  });
};
