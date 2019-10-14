import { rest } from "./rest";
export const subscriptionGetApi = body => rest.post("/subscribed/byuser", body);
