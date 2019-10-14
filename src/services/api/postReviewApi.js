import { rest } from "./rest";

export const postReviewApi = review => rest.post("/review/add", review);
