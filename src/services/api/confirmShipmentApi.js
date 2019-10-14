import { rest } from "../api/rest";
export const confirmShipmentApi = data => rest.post("/ship/confirm", data);
