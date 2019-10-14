import { rest } from "./rest";
export const addSubscribeToBackendApi = body =>
  rest.post("/api/subscribe", body);
