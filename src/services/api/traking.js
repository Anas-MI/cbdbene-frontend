import { rest } from "./rest";
export const getTrackingUrl = trackerid => rest.post("/ship/track", {trackerid});
