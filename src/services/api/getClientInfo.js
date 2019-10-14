import { baseUrl } from "../../components/Constants";

export const getClientInfo = () => {
  return fetch(`${baseUrl}/getinfo`, {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
};
