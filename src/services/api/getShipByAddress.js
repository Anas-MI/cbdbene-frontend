import { rest } from "../api/rest";
export const getShipByAddress = data => rest.post("/ship/shipment", data);
